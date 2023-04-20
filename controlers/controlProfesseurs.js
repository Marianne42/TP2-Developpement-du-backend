const HttpErreur = require("../models/http-erreur");

const Professeur = require("../models/professeurs")

const getProfesseurById = async (requete, reponse, next) => {
  const profId = requete.params.profId;
  let professeur;
  try {
    professeur = await Etudiant.findById(profId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération du professeur", 500)
    );
  }
  if (!professeur) {
    return next(new HttpErreur("Aucun professeur trouvée pour l'id fourni", 404));
  }
  reponse.json({ professeur: professeur.toObject({ getters: true }) });
};

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

const updateProfesseur = async (requete, reponse, next) => {
    const { titre, description } = requete.body;
    const profId = requete.params.profId;
  
    let professeur;
  
    try {
      professeur = await professeur.findById(profId);
      professeur.titre = titre;
      professeur.description = description;
      await professeur.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du professeur", 500)
      );
    }
  
    reponse.status(200).json({ professeur: professeur.toObject({ getters: true }) });
  };

  const supprimerProfesseur = async (requete, reponse, next) => {
    const profId = requete.params.profId;
    let professeur;
    try {
        professeur = await Professeur.findById(profId).populate("cours");
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression du professeur", 500)
      );
    }
    if(!professeur){
      return next(new HttpErreur("Impossible de trouver le professeur", 404));
    }
  
    try{
  
      
      await professeur.remove();
      professeur.cours.professeur.pull(professeur);
      await professeur.cours.save()
  
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression du professeur", 500)
      );
    }
    reponse.status(200).json({ message: "Professeur supprimée" });
  };

exports.creerProfesseur = creerProfesseur;
exports.getProfesseur = getProfesseur;
exports.supprimerProfesseur = supprimerProfesseur;
exports.updateProfesseur = updateProfesseur;
exports.getProfesseurById = getProfesseurById;