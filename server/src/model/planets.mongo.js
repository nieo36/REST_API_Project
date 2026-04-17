const mongoose = require('mongoose');
const planets_schema = new mongoose.Schema({
    kepler_name: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Planet', planets_schema);