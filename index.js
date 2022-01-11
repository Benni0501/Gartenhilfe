const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path');
const mqtt = require('mqtt');
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://gateway.local:1883'
var value = false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Test-Counter
var counter = 0;


const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
})
const topicOne = "webthings/virtual-things-custom-737dafd5-989e-485a-a204-9ed623041207/properties/ON_OFF"
client.on('connect', () => {
    console.log("Connected");
    client.subscribe([topicOne], () => {
        console.log("Subscribed")
    })
    client.on('message', (topic, payload) => {
        if(topic == topicOne){
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

// mögliche Ansteuerung von Website per POST-Request
app.post("/setProperty", (req,res) => {
    let reqJSON = JSON.parse(req);

    if(client.connected){
        client.publish("webthings/virtual-things-custom-737dafd5-989e-485a-a204-9ed623041207/properties/ON_OFF/set", reqJSON.value, { qos: 2, retain: false }, (error) => {
            if (error) {
              console.error(error)
            } else {
                console.log("Sent");
            }
        })
        res.status = 200;
        res.end();
    } else {
        res.status = 504;
        res.end();
    }
    // gibt den Status-Code 200 zurück
    
})

// Senden eines Werts von Backend zu Frontend
app.get("/getButtons", (req,res) => {
    if(client.connected){
        let resJSON = {
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