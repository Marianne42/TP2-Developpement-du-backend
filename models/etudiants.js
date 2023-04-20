const mongoose = require("mongoose");

const etudiantsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    numAdmission: {type: Number, required: true},
    cours: [{type: mongoose.Types.ObjectId, required: false, ref:"cours"}]
    
});

module.exports = mongoose.model("etudiants", etudiantsSchema);