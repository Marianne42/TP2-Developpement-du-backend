const mongoose = require("mongoose");
const cours = require("./cours");

const professeursSchema = new mongoose.Schema({
    id: {type: int, required: true},
    dateEmbauche: {type: Date, required: true},
    nom: {type: string, required: true},
    prenom: {type: string, required: true},
    photo: {type: string, required: true},
    cours: {type: cours, required: false}
});

module.exports = mongoose.model("Professeurs", professeursSchema);