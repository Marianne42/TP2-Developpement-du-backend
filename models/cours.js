const mongoose = require("mongoose");

const coursSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    titre: {type: String, required: true},
    discipline: {type: String, required: true},
    nbrMaxEtudiants: {type: Number, required: true},
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    professeur: {type: mongoose.Types.ObjectId, required: true, ref:"professeurs"},
    listeEtudiants: [{type: mongoose.Types.ObjectId, required: false, ref:"etudiants"}]
});

module.exports = mongoose.model("cours", coursSchema);