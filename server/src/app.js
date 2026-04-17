const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');//light weight logger for production use pino or winston
const api = require("./routes/api.js");
const app = express();
app.use((req, res, next) => {
    console.log(req.method, req.url, req.ip);
    next();
})
app.use(cors({
    origin: 'http://localhost:3000'
}));
// app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/v1', api);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})
module.exports = app;

