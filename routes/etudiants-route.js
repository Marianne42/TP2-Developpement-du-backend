const express = require("express");

const controleursEtudiants = require("../controlers/controlEtudiants")
const router = express.Router();

router.post('/etudiants', controleursEtudiants.creerEtudiant)

router.get('/etudiants', controleursEtudiants.getEtudiant)

module.exports = router;