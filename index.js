const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
    console.log("Get");
   // res.end();
})

app.post("/writeSomething", (req,res) => {
    console.log(req.body.textToWrite);
    res.status(200);
    res.end();
})
console.log("Trying to start server");
app.listen(3001, () => console.log("server started successfully"));