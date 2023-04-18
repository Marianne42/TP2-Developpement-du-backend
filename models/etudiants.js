const mongoose = require("mongoose");
const cours = require("./cours");

const etudiantsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    numAdmission: {type: Number, required: true},
    cours: {type: cours, required: true}
    
});

module.exports = mongoose.model("etudiants", etudiantsSchema);