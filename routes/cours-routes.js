const express = require("express");

const controleursCours = require("../controlers/controlCours")
const router = express.Router();

router.post('/cours', controleursCours.creerCours)

router.get('/cours', controleursCours.getCours)

router.get('/cours/:coursId', controleursCours.getCoursById)

router.patch('/cours', controleursCours.updateCours)

router.delete('/cours', controleursCours.supprimerCours)

module.exports = router;