
const Cours = require("../models/cours")

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

    const resultat = await nouveauCours.save();

    reponse.json(resultat);
}


const getCours = async (requete, reponse, next) =>{

    const cours = await cours.find().exec();

    reponse.json(cours);
}

const updateCours = async (requete, reponse, next) => {
    const { titre, description } = requete.body;
    const coursId = requete.params.coursId;
  
    let cours;
  
    try {
      cours = await cours.findById(coursId);
      cours.titre = titre;
      cours.description = description;
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