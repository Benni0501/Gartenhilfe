const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const ws = require("ws");
const { OPEN } = require("ws");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const wss = new ws.Server({server});

wss.on("connection", (ws) => {
    ws.send("Hello World!");
    console.log("Aktuelle Verbindungen: " + wss.clients.size);
    ws.on("message", (message)=>{
        console.log("New incoming Message: " + message.toString());
        if(ws.readyState === OPEN){
            ws.send("You sent: " + message.toString());
        }
    });
});

wss.on("close", (ws) =>{
    ws.close();
    console.log("Closed Aktuelle Verbindungen: " + wss.clients.length);
});

console.log("Trying to start server");
// Server Start
server.listen(3002, () => console.log("server started successfully"));
