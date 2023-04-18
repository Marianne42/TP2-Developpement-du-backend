const mongoose = require("mongoose");
const professeurs = require("./professeurs");

const coursSchema = new mongoose.Schema({
    id: {type: int, required: true},
    titre: {type: string, required: true},
    discipline: {type: string, required: true},
    nbrMaxEtudiants: {type: int, required: true},
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    professeur: {type: professeurs, required: true}
});

module.exports = mongoose.model("cours", coursSchema);