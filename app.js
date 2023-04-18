const express = require('express');
const bodyParser = require('body-parser');
//const mongo = require("./mongo")
const mongoose = require("./controlers/mongoose")


const app = express();

app.use(bodyParser.json());

app.post('/chat', mongoose.creerChat);

app.get('/chat', mongoose.getChat);

app.listen(5001);