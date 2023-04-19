const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const RouteProfesseurs = require('./routes/professeurs-routes')



const app = express();

app.use(bodyParser.json());

app.post(RouteProfesseurs)

app.get(RouteProfesseurs)




mongoose.connect("mongodb://127.0.0.1:27017"
).then(() => {
    app.listen(5001);
    console.log("Connexion à la base de données réussie")
}).catch(() =>{
    console.log("Erreur lors de la connexion");
});