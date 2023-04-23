const express = require("express");

const controleursProfesseurs = require("../controlers/controlProfesseurs")
const router = express.Router();

router.post('/professeurs', controleursProfesseurs.creerProfesseur)

router.get('/professeurs', controleursProfesseurs.getProfesseur)

router.get('/professeurs/:profId', controleursProfesseurs.getProfesseurById)

router.patch('/professeurs', controleursProfesseurs.updateProfesseur)

router.delete('/professeurs', controleursProfesseurs.supprimerProfesseur)

module.exports = router;