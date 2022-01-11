const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path');
const mqtt = require('mqtt');
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://192.168.43.129:1883'

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
const topic = "webthings/aa3cc4d8-3d99-49f6-875f-6deb8ea7c2f5/actions/on"
client.on('connect', () => {
    console.log("Connected");
    client.subscribe([topic], () => {
        console.log("Subscribed")
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
      })
    client.publish("webthings/aa3cc4d8-3d99-49f6-875f-6deb8ea7c2f5/properties/on/set", "true", { qos: 2, retain: false }, (error) => {
        if (error) {
          console.error(error)
        } else {
            console.log("Sent");
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
app.post("/writeSomething", (req,res) => {
    // gibt den Body aus
    console.log(req.body);
    counter++;
    console.log(counter);
    // gibt den Status-Code 200 zurück
    res.status = 200;
    res.end();
})

// Senden eines Werts von Backend zu Frontend
app.get("/getSomething", (req,res) => {
    res.send(counter.toString());
    console.log("Get");
    res.statusCode = 200;
    res.end();
})
console.log("Trying to start server");
// Server Start
app.listen(3001, () => console.log("server started successfully"));