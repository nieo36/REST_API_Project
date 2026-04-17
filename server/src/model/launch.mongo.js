const mongoose = require('mongoose');
const launch_schema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: Date,
    target: {
        type: String,
        // required: true
    },
    customers: Array,
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('Launch', launch_schema);