const express = require('express');
const planets_controller = require('./planets.controller.js');

const planet_router = express.Router();

planet_router.get('/',planets_controller.getAllPlanets);

module.exports={
	planet_router
}
