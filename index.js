const ws = require("ws")
const mqtt = require('mqtt');
const clientId = 'mqtt_123' + Math.random()*5;
const connectUrl = 'mqtts://127.0.0.1:8883'
const mysql = require('mysql');
const https = require('https');
const fs = require('fs');
var Extensions = require('websocket-extensions'),
    deflate    = require('permessage-deflate');

var exts = new Extensions();
exts.add(deflate);
var dataCache = {};
var dataCacheSensors = {};
//console.log(clientId);

// Server erstellen und WebSocket zuweisen
const server = https.createServer({
      cert : fs.readFileSync('/etc/letsencrypt/live/suppanschitz.com/cert.pem'),
      key : fs.readFileSync('/etc/letsencrypt/live/suppanschitz.com/privkey.pem')
});
const wss = new ws.Server({server});

// MySQL-Pool erstellen
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "nodejs",
    password: "benni0501",
    database: "webthings"
});

// Alle Daten zu allen Clients senden
function sendDataToClient(){
	wss.clients.forEach((con) => {
        con.send(JSON.stringify(dataCache));
    });
}
// Nur Sensordaten zu allen Clients zu senden
function sendSensorDataToClient(){
	wss.clients.forEach((con)=>{
        con.send(JSON.stringify(dataCacheSensors));
    });
}
// alle Daten zu einem Client zu senden
function sendDatatoOneClient(ws){
    ws.send(JSON.stringify(dataCache));
}

// neue Daten von Datenbank holen
function getNewData(){
    var tipps = {};
    var sensors = {};
    pool.getConnection(function(err,conn){
        if(err) console.error(err);
        conn.query('SELECT * FROM gartentipps', function(err,results){
            tipps = results;
            if(err) console.error(err.message);
            conn.query('SELECT* FROM webthings', function(err,results){
                if(err) console.error(err.message);
                results.forEach((res)=>{
                    let yaman = res.webthings_id.split('/');
                    res.webthings_id = yaman[0].substring(34);
                });
                sensors = results;
                dataCache = {"tipps":tipps, "sensors":sensors};
                dataCacheSensors = {"tipps":null, "sensors":sensors};
            });
        });
        conn.release();
    });
}

// MQTT-Client
const client = mqtt.connect(connectUrl , {
    clientId,
    clean: true,
    username: 'nodejs',
    password: '<password>',
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    cert: fs.readFileSync('/etc/letsencrypt/live/suppanschitz.com/cert.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/suppanschitz.com/privkey.pem'),
    rejectUnauthorized: false
})

// On WebSocket Connection
wss.on("connection", (ws) => {
    console.log("Connection opened")
    sendDatatoOneClient(ws);
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
        //console.log(topic.substring(34,46));
        
        // Get Data from Database and send it to the clients
	    pool.query('UPDATE webthings SET value=? WHERE webthings_id=?',[payload.toString(),topic], function (error, results, fields) {
  		if (error) console.error(error.message);
  		console.log('The solution is: ', results[0].solution);
        getNewData();
		sendSensorDataToClient();
	});
     })
})
console.log("Trying to start server");
// Server Start
server.listen(3001, () => {
    console.log("server started successfully");
    getNewData();
});
