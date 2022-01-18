const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path');
const mqtt = require('mqtt');
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://gateway.local:1883'
const mysql = require('mysql2');
var value = false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*
var pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    host: "gateway.local",
    user: "user",
    password: "benni0501",
    database: "webthings"
});

pool.query('SELECT 1 + 1 FROM dual', function(error,results, fields){
    if(error) throw error;
    console.log("TEST ", results);
});
*/

//Test-Counter
var counter = 0;

// MQTT-Client
const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
})
// Topic zum subscriben
const topicOne = "webthings/virtual-things-custom-737dafd5-989e-485a-a204-9ed623041207/properties/ON_OFF"
// OnClientConnect
client.on('connect', () => {
    console.log("Connected");
    // Topic Subscribe
    client.subscribe([topicOne], () => {
        console.log("Subscribed")
    })
    // Subscribe Listender
    client.on('message', (topic, payload) => {
        if(topic == topicOne){
            // Variable ändern --> später Datenbank
            value = (payload.toString() === "true");
            console.log("Received: ",topic,payload.toString());
        }
      })
    
})

// Root-Verzeichnis für Website --> vielleicht auf Apache übertragen
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
    console.log("Get");
    res.end();
})

// Ansteuerung von Frontend per POST-Request
app.post("/setProperty", (req,res) => {
    console.log(req.body);
    // Check if Client is connected
    if(client.connected){
        // wenn ja dann wird das value vom frontend zu webthings gesendet
        // später Datenbankanbindung hier
        client.publish("webthings/virtual-things-custom-737dafd5-989e-485a-a204-9ed623041207/properties/ON_OFF/set", req.body.value.toString(), { qos: 2, retain: false }, (error) => {
            if (error) {
              console.error(error)
            } else {
                console.log("Sent");
            }
        })
        res.status = 200;
        res.end();
    } else {
        // wenn nein dann error zurückgeben
        res.status = 504;
        res.end();
    }
})

// Senden eines Werts von Backend zu Frontend
app.get("/getButtons", (req,res) => {
    if(client.connected){
        // JSON Objekt
        let resJSON = {
            // später ID-System
            "id":"buttonOne",
            "value":value
        }
        res.send(JSON.stringify(resJSON));
        res.statusCode = 200;
        res.end();
    } else {
        res.statusCode = 503;
        res.send("MQTT Server unreachable!")
        res.end();
    }
    
})
console.log("Trying to start server");
// Server Start
app.listen(3001, () => console.log("server started successfully"));