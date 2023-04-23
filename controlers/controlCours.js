const HttpErreur = require("../models/http-erreur");

const Cours = require("../models/cours")
const Professeur = require("../models/professeurs")

const getCoursById = async (requete, reponse, next) => {
  const coursId = requete.params.coursId;
  let cours;
  try {
    cours = await Cours.findById(coursId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération du cours", 500)
    );
  }
  if (!cours) {
    return next(new HttpErreur("Aucun cours trouvée pour l'id fourni", 404));
  }
  reponse.json({ cours: cours.toObject({ getters: true }) });
};


const creerCours = async (requete, reponse, next) =>{
    const nouveauCours = new Cours({
        id: requete.body.id,
        titre: requete.body.titre,
        discipline: requete.body.discipline,
        nbrMaxEtudiants: requete.body.nbrMaxEtudiants,
        dateDebut: requete.body.dateDebut,
        dateFin: requete.body.dateFin,
        professeur: requete.body.professeur,
        listeEtudiants: requete.body.listeEtudiants
    });

    try {
      professeur = await Professeur.findById(requete.body.professeur);
      professeur.cours.push(nouveauCours._id);
      await professeur.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du professeur", 500)
      );
    }

    const resultat = await nouveauCours.save();


    reponse.json(resultat);
}


const getCours = async (requete, reponse, next) =>{

    const cours = await Cours.find().exec();

    reponse.json(cours);
}

const updateCours = async (requete, reponse, next) => {
    const { titre, discipline } = requete.body;
    const coursId = requete.body.coursId;
  
    let cours;
  
    try {
      cours = await Cours.findById(coursId);
      cours.titre = titre;
      cours.discipline = discipline;
      await cours.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du cours", 500)
      );
    }
  
    reponse.status(200).json({ cours: cours.toObject({ getters: true }) });
  };

  const supprimerCours = async (requete, reponse, next) => {
    const coursId = requete.params.coursId;
    let cours;
    try {
        cours = await Cours.findById(coursId).populate("createur");
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression du cours", 500)
      );
    }
    if(!cours){
      return next(new HttpErreur("Impossible de trouver le cours", 404));
    }
  
    try{
  
      
      await cours.remove();
      cours.createur.cours.pull(cours);
      await cours.createur.save()
  
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression du cours", 500)
      );
    }
    reponse.status(200).json({ message: "cours supprimée" });
  };

exports.creerCours = creerCours;
exports.getCours = getCours;
exports.supprimerCours = supprimerCours;
exports.updateCours = updateCours;
exports.getCoursById = getCoursById;