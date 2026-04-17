const {
    parse
} = require('csv-parse');
const fs = require('fs');
const mongo = require('./planets.mongo.js')
const planets = [];
const allpromises = [];

function csv_promise() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('kepler-data.csv').pipe(parse({
            comment: '#',
            columns: true
        })).on('data', (data) => {
            if (data.koi_disposition === "CONFIRMED" && (data.koi_insol >= 0.36 && data["koi_insol"] <= 1.11) && data["koi_prad"] <= 1.6) {
                //planets.push(data); // for in memory storage 
                //DB storage
                // await mongo.updateOne({
                // 	keplerName: data.kepler_name
                // },{
                // 	keplerName: data.kepler_name
                // },{
                // 	upsert:true
                // });
                allpromises.push(savePlanet(data));
                //savePlanet(data);
                return;
            }
            //planets.push(data);
        }).on('error', err => {
            console.log('Data error:', err);
            reject(err);
        }).on('end', async () => {
            //const names=planets.map((arr)=>{
            //console.log(arr.kepler_name);
            //return arr.kepler_name;
            //});
            await Promise.all(allpromises);
            const planetsCount = (await getPlanets()).length;
            console.log(`(${planetsCount}) planets found`)
            resolve();
            //console.log(names);
        });
    });
}
async function getPlanets() {
    return await mongo.find({}, {
        "_id": 0,
        "__v": 0
    });
    //return planets;
}
async function savePlanet(data) {
    try {
        await mongo.updateOne({
            kepler_name: data.kepler_name
        }, {
            kepler_name: data.kepler_name
        }, {
            upsert: true
        });
    } catch (err) {
        console.error("db error")
    }
}
module.exports = {
    csv_promise,
    planets,
    getPlanets
}
