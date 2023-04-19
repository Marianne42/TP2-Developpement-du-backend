
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

  const supprimerCours = async (requete, reponse, next) => {
    const profId = requete.params.profId;
    let professeur;
    try {
        professeur = await Professeur.findById(profId).populate("createur");
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
      professeur.createur.professeur.pull(professeur);
      await professeur.createur.save()
  
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression du professeur", 500)
      );
    }
    reponse.status(200).json({ message: "Professeur supprimée" });
  };