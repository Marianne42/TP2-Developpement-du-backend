const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const RouteProfesseurs = require('./routes/professeurs-routes')
const RouteCours = require('./routes/cours-routes')
const RouteEtudiants = require('./routes/etudiants-route')
const HttpErreur = require("./models/http-erreur");



const app = express();

app.use(bodyParser.json());

app.use("/", RouteProfesseurs)

app.use((requete, reponse, next) => {
    return next(new HttpErreur("Route non trouvée", 404));
  });
  
  app.use((error, requete, reponse, next) => {
    if (reponse.headerSent) {
      return next(error);
    }
    reponse.status(error.code || 500);
    reponse.json({
      message: error.message || "Une erreur inconnue est survenue",
    });
  });



mongoose.connect("mongodb://127.0.0.1:27017"
).then(() => {
    app.listen(5001);
    console.log("Connexion à la base de données réussie")
}).catch(() =>{
    console.log("Erreur lors de la connexion");
});