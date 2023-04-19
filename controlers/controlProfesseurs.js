
const Professeur = require("../models/professeurs")

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


const getProfesseur = async (requete, reponse, next) =>{

    const professeurs = await Professeur.find().exec();

    reponse.json(professeurs);
}

exports.creerProfesseur = creerProfesseur;
exports.getProfesseur = getProfesseur;