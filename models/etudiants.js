const mongoose = require("mongoose");
const cours = require("./cours");

const etudiantsSchema = new mongoose.Schema({
    id: {type: int, required: true},
    nom: {type: string, required: true},
    prenom: {type: string, required: true},
    numAdmission: {type: int, required: true},
    cours: {type: cours, required: true}
    
});

module.exports = mongoose.model("etudiants", etudiantsSchema);