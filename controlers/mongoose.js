const mongoose = require("mongoose");

//const Produit = require("./models/produit")

mongoose.connect("mongodb+srv://marianne24:8uqUZmDexDfxRv4l@ecolemarianneaspeck.j3vqq6t.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    console.log("Connexion à la base de données réussie")
}).catch(() =>{
    console.log("Erreur lors de la connexion");
});

const creerProfesseur = async (requete, reponse, next) =>{
    const nouveauProfesseur = new Professeur({
        id: requete.body.id,
        dateEmbauche: requete.body.dateEmbauche,
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        photo: requete.body.photo,
        cours: requete.body.cours
    });

    const resultat = await nouveauProfesseur.save();

    reponse.json(resultat);
}

const creerChat = async (requete, reponse, next) =>{
    const nouveauChat = new chat({
        chat: requete.body.chat
    });

    const resultat = await nouveauChat.save();

    reponse.json(resultat);
}

const getProfesseur = async (requete, reponse, next) =>{

    const professeurs = await Professeur.find().exec();

    reponse.json(professeurs);
}

const getChat= async (requete, reponse, next) =>{

    const chats = await chat.find().exec();

    reponse.json(chats);
}

exports.creerChat = creerChat;
exports.getChat = getChat;
exports.creerProfesseur = creerProfesseur;
exports.getProfesseur = getProfesseur;