const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const ws = require("ws")
const mqtt = require('mqtt');
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://127.0.0.1:1883'
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Server erstellen und WebSocket zuweisen
const server = http.createServer(app);
const wss = new ws.Server({server});

// MySQL-Pool erstellen
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "nodejs",
    password: "benni0501",
    database: "webthings"
});

// MQTT-Client
const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
})

// On WebSocket Connection
wss.on("connection", (ws) => {
    console.log("Connection opened")
    pool.getConnection(function(err,conn){
        conn.query('SELECT id,value,unit FROM webthings', function(error,results, fields){
            if(error) throw error;
            ws.send(JSON.stringify(results));
        });
        conn.release();
    });
    
});

// On WebSocket Close
wss.on("close", (ws) =>{
    console.log("Connection closed");
});

// On MQTT Connect
client.on('connect', () => {
    console.log("Connected to MQTT");
    // Topic Subscribe
    client.subscribe("webthings/#", () => {
        console.log("Subscribed")
    })
    // Subscribe Listender
    client.on('message', (topic, payload) => {
        console.log("Received: ",topic,payload.toString());
        topic = topic.substring(10);
        //console.log(topic);
        pool.query('UPDATE webthings SET value=? WHERE webthings_id=?',[payload.toString(),topic], function(error,results, fields){
            if(error) throw error;
            //console.log("TEST ", results);
        });
        
        // Get Data from Database and send it to the clients
        pool.getConnection(function(err,conn){
            conn.query('SELECT id,value,unit FROM webthings', function(error,results, fields){
                if(error) throw error;
                //console.log("TEST ", results);
                wss.clients.forEach((con)=>{
                    con.send(JSON.stringify(results));
                });
            });
            conn.release();
        });

      })
})

console.log("Trying to start server");
// Server Start
server.listen(3001, () => console.log("server started successfully"));
