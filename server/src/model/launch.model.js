const mongo = require('./launch.mongo.js');
const planet = require('./planets.mongo.js');
const axios = require('axios');
//const launch = new Map();
// const launch_data = {
//  flightNumber:1523,
//  mission:"Mars Explorer",
//  rocket:"Explorer 4569s",
//  launchDate: new Date('APRIL 06 2026'),
//  target:"Kepler-442 b",
//  customers:['ISRO','NASA','JAXA','ROSCOM','ESA'],
//  upcoming:true,
//  success:true
// }
let launch_id = 1000;
// launch.set(launch_data.flightNumber,launch_data);
// async function saveLaunch(launch){ 
//  const p=await planet.find({
//      kepler_name:launch.target,   
//  });
//  if(!p){
//      throw new Error('planet not found');
//  }
//  await mongo.updateOne({
//      flightNumber:launch.flightNumber
//  },
//  launch,
//  {
//      upsert:true 
//  })
// }
// saveLaunch(launch_data);
async function checkdata(filter) {
    return await mongo.findOne(filter);
}
async function add_spacex(data) {
    Object.assign(data, {
        flightNumber: await latestId(),
    });
    await mongo.findOneAndUpdate({
        flightNumber: data.flightNumber
    }, data, {
        upsert: true
    })
}
async function loadLaunchData() {
    // const response = await fetch('https://api.spacexdata.com/v5/launches/query', {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         query: {},
    //         options: {
    //             populate: [{
    //                 path: "rocket",
    //                 select: {
    //                     name: 1
    //                 }
    //             }, {
    //                 path: "payloads",
    //                 select: {
    //                     customers: 1
    //                 }
    //             }]
    //         }
    //     })
    // });
    // const result = await response.json();
    // const launchDocs = result.docs;
    // //console.log(launchDocs);
    // const launch = {};
    // const customers = launchDocs.payloads.flatMap(p => {
    //     return p.customers
    // });
    // Object.assign(launch, {
    //     flightNumber: launchDocs.flight_number,
    //     mission: launchDocs.name,
    //     rocket: launchDocs.rocket.name,
    //     launchDate: launchDocs.date_local,
    //     upcoming: launchDocs.upcoming,
    //     success: launchDocs.success,
    //     customers: customers
    // })
    // console.log(launch);
    //axios method
    const first = await checkdata({
        flightNumber: 1000,
        mission: "FalconSat",
        rocket:"Falcon 1"
    });
    if (first) {
        console.log("launch already exists");
        return;
    }
    const response = await axios.post('https://api.spacexdata.com/v5/launches/query', {
        query: {},
        options: {
            pagination: false,
            populate: [{
                path: "rocket",
                select: {
                    name: 1
                }
            }, {
                path: "payloads",
                select: {
                    customers: 1
                }
            }]
        }
    })
    if(response.status!=200){
        console.log("error fetching data");
        throw new Error('launch error');
    }
    const launchDocs = response.data.docs;
    let i = 0;
    for (const launchDoc of launchDocs) {
        const customers = launchDoc.payloads.flatMap(p => {
            return p.customers
        });
        i++;
        const launch = {
            flightNumber: launchDoc.flight_number,
            mission: launchDoc.name,
            rocket: launchDoc.rocket.name,
            launchDate: launchDoc.date_local,
            upcoming: launchDoc.upcoming,
            success: launchDoc.success,
            customers: customers
        }
        await add_spacex(launch);
        console.log(launch.rocket, launch.mission, i);
    }
}
async function getAllLaunches(p) {
    // return Array.from(launch.values());
    return await mongo.find({}, {
        "_id": 0,
        "__v": 0
    })
    .skip(p.skip)
    .limit(p.limit);
}
async function latestId() {
    const i = await mongo.findOne().sort('-flightNumber');
    if (!i) {
        return launch_id;
    }
    return i.flightNumber + 1;
}
async function addNewLaunch(launch_post_data) {
    //launch_id++;
    // launch.set(launch_id,Object.assign(launch_post_data,{flightNumber:launch_id,
    //  upcoming:true,success:true,customers:['ISRO','NASA','JAXA','ROSCOM','ESA']})); 
    Object.assign(launch_post_data, {
        flightNumber: await latestId(),
        upcoming: true,
        success: true,
        customers: ['ISRO', 'NASA', 'JAXA', 'ROSCOM', 'ESA']
    });
    // Object.assign(launch_post_data,{flightNumber:await latestId()})
    const p = await planet.findOne({
        kepler_name: launch_post_data.target,
    });
    if (!p) {
        //throw new Error('planet not found');
        console.log('planet not found');
        return;
    }
    await mongo.findOneAndUpdate({
        flightNumber: launch_post_data.flightNumber
    }, launch_post_data, {
        upsert: true
    })
}
async function launch_id_check(id) {
    return mongo.findOne({
        flightNumber: id
    });
}
async function delete_launch_data(id) {
    // const deleted=launch.get(id);
    // deleted.upcoming=false;
    // deleted.success=false;  
    // launch.delete(id);
    // return deleted;
    //to remove from database
    // return await mongo.deleteOne({
    //  flightNumber:id
    // })
    //to move to history
    return await mongo.updateOne({
        flightNumber: id
    }, {
        upcoming: false,
        success: false
    })
}
module.exports = {
    getAllLaunches,
    addNewLaunch,
    launch_id_check,
    delete_launch_data,
    loadLaunchData,
    checkdata
}