const mongoose = require("mongoose");
const cours = require("./cours");

const professeursSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    dateEmbauche: {type: Date, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    photo: {type: String, required: true},
    cours: [{type: String, required: false}]
});

module.exports = mongoose.model("Professeurs", professeursSchema);