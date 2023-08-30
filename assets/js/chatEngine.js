const socket = io.connect('http://localhost:5000');
let inputText = document.getElementById('box');
let str = inputText.innerText;

// Listen for events from the server
socket.on('message', (message) => {
    if (str) {
        inputText.innerText = str+message;
    } else {
        inputText.innerText = message;
    }
    console.log(inputText.innerText);
    document.getElementById("main").innerHTML = `<div id="box">${inputText.innerText}</div>`+'<button id="btn" onclick="sendMessage()">Send</button>';
});

// showing the list of valid data
socket.on('success_message', function(obj) {
    //console.log(obj.name);
    document.getElementById('message_container').innerHTML += `<li>${obj.name}&nbsp;|&nbsp;${obj.origin}&nbsp;|&nbsp;${obj.destination}</li>`;
});

// Emit events to the server
function sendMessage() {
    socket.emit('encryptedMessage',inputText.innerText);
    document.getElementById("main").innerHTML = '';
}