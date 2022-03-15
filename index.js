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
var clients = [];

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "nodejs",
    password: "benni0501",
    database: "webthings"
});

//Test-Counter
var resJSON = {};
var topic1;

// MQTT-Client
const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
})

wss.on("connection", (ws) => {
    ws.send("Hello World!");
    clients.push(ws);
    var returnValue = {}
        pool.getConnection(function(err,conn){
            conn.query('SELECT id,value,unit FROM webthings', function(error,results, fields){
                if(error) throw error;
                //console.log("TEST ", results);
                returnValue = results;
            });
            pool.releaseConnection(conn);
        });
    ws.send(returnValue.stringify());
});

wss.on("close", (ws) =>{
    clients.forEach((con) =>{
        if(con == ws){
            clients.splice(clients.indexOf(con), 1);
        }
    });
});


// Topic zum subscriben
//const topicOne = "webthings/virtual-things-custom-737dafd5-989e-485a-a204-9ed623041207/properties/ON_OFF"
// OnClientConnect
client.on('connect', () => {
    console.log("Connected");
    // Topic Subscribe
    client.subscribe("webthings/#", () => {
        console.log("Subscribed")
    })
    // Subscribe Listender
    client.on('message', (topic, payload) => {
        // Variable ändern --> später Datenbank
        console.log("Received: ",topic,payload.toString());
        topic = topic.substring(10);
        //console.log(topic);
        pool.getConnection(function(err,conn){
            conn.query('UPDATE webthings SET value=? WHERE webthings_id=?',[payload.toString(),topic], function(error,results, fields){
                if(err) throw err;
                //console.log("TEST ", results);
                pool.releaseConnection(conn);
            });
            
        });
        var returnValue = {}
        pool.getConnection(function(err,conn){
            conn.query('SELECT id,value,unit FROM webthings', function(error,results, fields){
                if(error) throw error;
                //console.log("TEST ", results);
                returnValue = results;
            });
            pool.releaseConnection(conn);
        });
        clients.forEach((con)=>{
            con.send(returnValue.stringify());
        });
      })
})

console.log("Trying to start server");
// Server Start
server.listen(3002, () => console.log("server started successfully"));