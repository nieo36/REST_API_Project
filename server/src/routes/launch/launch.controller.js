const {
    getAllLaunches,
    addNewLaunch,
    launch_id_check,
    delete_launch_data
} = require('../../model/launch.model.js');

const pagination=require("../../utils/query.js");

async function httpGetAllLaunchData(req, res, next) {
    console.log(req.query);
    //const {skip,limit}=pagination(req.query);
    return res.status(200).json(await getAllLaunches(pagination(req.query)));
    //OR
    // const data=JSON.stringify(Array.from(launch.values()));
    // res.setHeader("Content-Type","application/json")
    // res.status(200).send(data);
}
async function httpAddNewLaunchData(req, res) {
    const launch_post_data = req.body;
    if (!launch_post_data.mission || !launch_post_data.rocket || !launch_post_data.target) {
        return res.status(400).json({
            'error': 'invalid request'
        })
    }
    launch_post_data.launchDate = new Date(launch_post_data.launchDate)
    if (launch_post_data.launchDate.toString() === "Invalid Date") {
        return res.status(400).json({
            'error': 'invalid date'
        })
    }
    await addNewLaunch(launch_post_data);
    return res.status(201).json(launch_post_data);
}
async function httpDeleteLaunchData(req, res) {
    const id = Number(req.params.id);
    const exists = await launch_id_check(id);
    if (!exists) {
        return res.status(400).json({
            error: "Id not found"
        })
    }
    const deleted = await delete_launch_data(id);
    // if (deleted.deletedCount === 0) {
    //   return res.status(400).json({ error: "Delete failed" });
    // }
    return res.status(200).json({
        id,
        "status": "deleted",
        deleted
    });
}
module.exports = {
    httpGetAllLaunchData,
    httpAddNewLaunchData,
    httpDeleteLaunchData
}