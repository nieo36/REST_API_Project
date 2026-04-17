const express=require('express');
const {planet_router}=require('./planets/planets.router');
const {launch_router}=require('./launch/launch.router');

const api=express.Router();

api.use('/planets', planet_router);
api.use('/launches', launch_router);

module.exports=api;
