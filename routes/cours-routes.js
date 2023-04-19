const express = require("express");

const controleursCours = require("../controlers/controlCours")
const router = express.Router();

router.post('/cours', controleursCours.creerCours)

router.get('/cours', controleursCours.getCours)

module.exports = router;