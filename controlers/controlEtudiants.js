const Etudiant = require("../models/etudiants")

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
    const { titre, description } = requete.body;
    const etudiantId = requete.params.etudiantId;
  
    let etudiant;
  
    try {
      etudiant = await etudiant.findById(etudiantId);
      etudiant.titre = titre;
      etudiant.description = description;
      await etudiant.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour de l'etudiant", 500)
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