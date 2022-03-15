const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const ws = require("ws")
const path = require('path');
const mqtt = require('mqtt');
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://127.0.0.1:1883'
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const wss = new ws.Server({server});
var clients = []


wss.on("connection", (ws) => {
    ws.send("Hello World!");
    clients.push(ws);
    ws.on("message", (message) => {
        console.log(wss.clients.size)
        clients.forEach((con)=>{
            con.send("TEST");
        });
    });
});

server.listen(3002, () => console.log("server started successfully"));