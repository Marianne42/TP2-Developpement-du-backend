const Etudiant = require("../models/etudiants")

const creerEtudiant = async (requete, reponse, next) =>{
    const nouveauEtudiant = new Etudiant({
        id: requete.body.id,
        dateEmbauche: requete.body.dateEmbauche,
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        photo: requete.body.photo,
        cours: requete.body.cours
    });

    const resultat = await nouveauEtudiant.save();

    reponse.json(resultat);
}


const getEtudiant = async (requete, reponse, next) =>{

    const etudiants = await Etudiant.find().exec();

    reponse.json(etudiants);
}

exports.creerEtudiant = creerEtudiant;
exports.getEtudiant = getEtudiant;