const mongoose = require("mongoose");
const professeurs = require("./professeurs");

const coursSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    titre: {type: String, required: true},
    discipline: {type: String, required: true},
    nbrMaxEtudiants: {type: Number, required: true},
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    professeur: {type: professeurs, required: true}
});

module.exports = mongoose.model("cours", coursSchema);