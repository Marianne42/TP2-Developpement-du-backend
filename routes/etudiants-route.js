const express = require("express");

const controleursEtudiants = require("../controlers/controlEtudiants")
const router = express.Router();

router.post('/etudiants', controleursEtudiants.creerEtudiant)

router.get('/etudiants', controleursEtudiants.getEtudiant)

router.get('/etudiants/:etudiantId', controleursEtudiants.getEtudiantById)

router.patch('/etudiants', controleursEtudiants.updateEtudiant)

router.delete('/etudiants', controleursEtudiants.supprimerEtudiant)

router.patch('/inscription', controleursEtudiants.inscrireEtudiant)

module.exports = router;