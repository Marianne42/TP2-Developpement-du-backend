const express = require("express");

const controleursEtudiants = require("../controlers/controlEtudiants")
const router = express.Router();

router.post('/etudiants', controleursEtudiants.creerEtudiant)

router.get('/etudiants', controleursEtudiants.getEtudiant)

router.get("/:etudiantId", controleursEtudiants.getEtudiantById);

router.patch('/:etudiantId', controleursEtudiants.updateEtudiant);

router.delete('/:etudiantId', controleursEtudiants.supprimerEtudiant)

module.exports = router;