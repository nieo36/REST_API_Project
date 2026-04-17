// import request from 'supertest';
// import app from '../../app.js';
// import mongoose from 'mongoose'
//jest by default only takes common js modules for es modules configure thes jets.config
const request = require('supertest');
const app = require('../../app.js');
const mongoose = require('mongoose');
//mongo db connectoin
const MONGO_URL = "mongodb+srv://root:root@cluster0.6gvakxd.mongodb.net/p3?retryWrites=true&w=majority&appName=Cluster0";
async function load() {
    await mongoose.connect(MONGO_URL);
}
describe("Test GET /v1/planets", () => {
    test("Success code 200", async () => {
        await load();
        const response = await request(app)
        .get('/v1/planets')
        .expect("Content-Type", /json/)
        .expect(200)
    })
    test("Json data check", async () => {
        const response = await request(app)
        .get('/v1/planets')
        .expect("Content-Type", /json/)
        expect(response.body).toMatchObject([{
            "kepler_name": "Kepler-1652 b"
        }, {
            "kepler_name": "Kepler-296 A f"
        }, {
            "kepler_name": "Kepler-296 A e"
        }, {
            "kepler_name": "Kepler-1649 b"
        }, {
            "kepler_name": "Kepler-62 f"
        }, {
            "kepler_name": "Kepler-452 b"
        }, {
            "kepler_name": "Kepler-1410 b"
        }, {
            "kepler_name": "Kepler-442 b"
        }])
    })
})