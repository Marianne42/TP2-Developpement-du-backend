const mongoose = require("mongoose");

const professeursSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    dateEmbauche: {type: Date, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    photo: {type: String, required: true},
    cours: [{type: mongoose.Types.ObjectId, required: false, ref:"cours"}]
});

module.exports = mongoose.model("Professeurs", professeursSchema);