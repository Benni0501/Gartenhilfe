const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.send("Hello World!");
})
console.log("Trying to start server");
app.listen(3001, () => console.log("server started successfully"));