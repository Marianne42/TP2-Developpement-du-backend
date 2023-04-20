const express = require("express");

const controleursProfesseurs = require("../controlers/controlProfesseurs")
const router = express.Router();

router.post('/professeurs', controleursProfesseurs.creerProfesseur)

router.get('/professeurs', controleursProfesseurs.getProfesseur)

router.get('/profId', controleursProfesseurs.getProfesseurById)

module.exports = router;