const express = require('express');
const {
    httpGetAllLaunchData,
    httpAddNewLaunchData,
    httpDeleteLaunchData
} = require('./launch.controller.js');
const launch_router = express.Router();
launch_router.get('/', httpGetAllLaunchData);
launch_router.post('/', httpAddNewLaunchData);
launch_router.delete('/:id', httpDeleteLaunchData);
module.exports = {
    launch_router
}