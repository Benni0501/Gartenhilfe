const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const ws = require("ws")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const wss = new ws.Server({server})

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message.toString());
    });
    ws.send("Hello World!");
});


server.listen(3002, () => console.log("server started successfully"));