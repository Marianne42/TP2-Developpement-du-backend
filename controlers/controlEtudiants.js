const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiants");

const Cours = require("../models/cours");


const getEtudiantById = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  let etudiant;
  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'etudiant", 500)
    );
  }
  if (!etudiant) {
    return next(new HttpErreur("Aucun etudiant trouvée pour l'id fourni", 404));
  }
  reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};

const creerEtudiant = async (requete, reponse, next) =>{
    const nouveauEtudiant = new Etudiant({
        id: requete.body.id,
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        numAdmission: requete.body.numAdmission,
        cours: requete.body.cours
    });

    const resultat = await nouveauEtudiant.save();

    reponse.json(resultat);
}


const getEtudiant = async (requete, reponse, next) =>{

    const etudiants = await Etudiant.find().exec();

    reponse.json(etudiants);
}

const updateEtudiant = async (requete, reponse, next) => {
    const { nom, prenom } = requete.body;
    const etudiantId = requete.body.etudiantId;
  
    let etudiant;
  
    try {
      etudiant = await Etudiant.findById(etudiantId);
      etudiant.nom = nom;
      etudiant.prenom = prenom;
      await etudiant.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour de l'etudiant", 500)
      );
    }
  
    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
  };

  const inscrireEtudiant = async (requete, reponse, next) => {
    const { cours, etudiantId } = requete.body;
    let etudiant;
  
    try {
      etudiant = await Etudiant.findById(etudiantId);
      etudiant.cours.push(cours);
      await etudiant.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour de l'etudiant", 500)
      );
    }

    try {
      coursInscrit = await Cours.findById(cours);
      coursInscrit.listeEtudiants.push(etudiantId);
      await coursInscrit.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du cours", 500)
      );
    }
  
    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
  };

  const supprimerEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
        etudiant = await etudiant.findById(etudiantId).populate("createur");
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression de l'etudiant", 500)
      );
    }
    if(!etudiant){
      return next(new HttpErreur("Impossible de trouver l'etudiant", 404));
    }
  
    try{
  
      
      await etudiant.remove();
      etudiant.createur.etudiant.pull(etudiant);
      await etudiant.createur.save()
  
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression de l'etudiant", 500)
      );
    }
    reponse.status(200).json({ message: "Etudiant supprimée" });
  };

  exports.creerEtudiant = creerEtudiant;
  exports.getEtudiant = getEtudiant;
  exports.supprimerEtudiant = supprimerEtudiant;
  exports.updateEtudiant = updateEtudiant;
  exports.getEtudiantById = getEtudiantById;
  exports.inscrireEtudiant = inscrireEtudiant;