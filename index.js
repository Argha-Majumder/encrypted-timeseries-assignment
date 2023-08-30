const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const http = require("http");
const server = http.createServer(app);
const db = require('./config/mongoose');
const cors = require('cors');

const chatSockets = require('./config/chat_sockets').chatSockets(server);
server.listen(5000);
console.log("Chatserver is listening on port 5000");
const corsOptions = {
  origin: 'http://localhost:8000',
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views');

app.use("/", require("./routes"));

app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening on port ${port}`);
});