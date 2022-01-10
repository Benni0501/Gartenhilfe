const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path');
const mqtt = require('mqtt');
const host = 'broker.hivemq.com'
const port = '1883'
const clientId = 'mqtt_123'
const connectUrl = 'mqtt://broker.hivemq.com:1883'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test-Counter
var counter = 0;


/*const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000
})
const topic = 'nodejs/mqtt'
client.on('connect', () => {
    console.log("Connected");
    client.subscribe([topic], () => {
        console.log("Subscribed")
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
      })
    client.publish("nodejs/test", 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
    })
})*/

// Root-Verzeichnis für Website --> vielleicht auf Apache übertragen
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
    console.log("Get");
   // res.end();
})

// mögliche Ansteuerung von Website per POST-Request
app.post("/writeSomething", (req,res) => {
    // gibt den Body aus
    console.log(req.body);
    counter++;
    console.log(counter);
    // gibt den Status-Code 200 zurück
    res.status(200);
})

// Senden eines Werts von Backend zu Frontend
app.get("/getSomething", (req,res) => {
    res.send(counter.toString());
})
console.log("Trying to start server");
// Server Start
app.listen(3001, () => console.log("server started successfully"));