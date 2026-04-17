const http = require('http');
const app = require('./app.js');
const {
    csv_promise
} = require('./model/planets.model.js');
const {
    loadLaunchData,checkdata
} = require('./model/launch.model.js');
const mongoose = require('mongoose');
const {
    connect_mongo
} = require("./utils/mongo.js");
require('dotenv').config();
const server = http.createServer(app);
const HOST = '0.0.0.0';
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URL;
//First way
// const dat=csv_promise().then(k=>{
// })
// .then(()=>{
// server.listen(PORT,HOST,()=>{
// console.log(`SERVER IS LISTENING AT ${HOST} ON PORT:${PORT}`);
// })
// });
//Second Way
async function load() {
    await connect_mongo(MONGO_URL);
    await csv_promise();
    await loadLaunchData();
    server.listen(PORT, HOST, () => {
        console.log(`SERVER IS LISTENING AT ${HOST} ON PORT:${PORT}`);
    })
}

load();
