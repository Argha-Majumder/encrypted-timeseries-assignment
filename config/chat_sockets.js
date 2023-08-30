const fs = require('fs');
const crypto = require('crypto');
const DataModel = require('../models/timeSeries');
const HashModel = require('../models/hashValues');
require('dotenv').config();

module.exports.chatSockets = function(socketServer) {
    
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });      

    io.sockets.on('connection', (socket) => {
        let datavalue = getDataFromFile();

        // Listen for events from the client
        socket.on('encryptedMessage', (encryptedMessage) => {
            // Decrypt and process the message
            let encryptedList = encryptedMessage.split('|');
            for (let enc of encryptedList) {
                const decryptedMessage = decrypt(enc, process.env.PASSKEY);
                let obj = JSON.parse(decryptedMessage);
                let hs = HashModel.findOne(obj['secret_key']);
                if (hs) {
                    saveToDatabase(obj);
                    socket.emit('success_message',obj);
                }
            }
        });
    
        const msgs = [];
        for (let i=0;i<datavalue['names'].length;i++) {
            let obj = {
                'name': datavalue['names'][i],
                'origin': datavalue['cities'][Math.floor(Math.random()*(datavalue['cities'].length))],
                'destination': datavalue['cities'][Math.floor(Math.random()*(datavalue['cities'].length))]
            }
            let hashValue = crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
            obj['secret_key'] = hashValue;
            HashModel.create({
                secret_code: hashValue
            });
            let msg = encrypt(JSON.stringify(obj), process.env.PASSKEY);
            msgs.push(msg);
        }

        function emitAllMessages(socket, msgs) {
            let idx = 1;
          
            function emitNextMessage() {
                if (msgs.length>0) {
                    let str = getStrValue(msgs, idx);
                    socket.emit('message', str);
                    idx = Math.floor(Math.random()*500);
                    setTimeout(emitNextMessage, 2000);
                }
            }
          
            emitNextMessage();
        }
          
        emitAllMessages(socket, msgs);
          
    });      
}

function getStrValue(msgs,idx) {
    if (idx>msgs.length) {
        idx = msgs.length;
    }
    let s = '';
    for (let i=0;i<idx;i++) {
        if (i==idx-1) {
            s += msgs.pop();
        } else {
            s += msgs.pop()+'|';
        }
    }
    return s;
}

function getDataFromFile() {
    const path = require('path');
    let datavalues = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data.json'), 'utf8'));
    return datavalues;
}

function saveToDatabase(data) {
    const newData = new DataModel(data);
    newData.save()
    .then(() => {
        console.log('Data saved to the database');
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
}

function encrypt(text, passKey) {
    const cipher = crypto.createCipher('aes-256-ctr', passKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
  
function decrypt(encryptedText, passKey) {
    const decipher = crypto.createDecipher('aes-256-ctr', passKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}