const request = require('supertest');
const app = require('../../app.js');
const {connect_mongo,disconnect_mongo}=require('../../utils/mongo.js');
//mongo db connectoin
const MONGO_URL = "mongodb+srv://root:root@cluster0.6gvakxd.mongodb.net/p3?retryWrites=true&w=majority&appName=Cluster0";
// async function load() {
//     await mongoose.connect(MONGO_URL);
// }
describe('Launch Api Test',() => {
	beforeAll(async()=>{
		// await load();
		await connect_mongo(MONGO_URL);
	});
    describe('Test GET /v1/launches', () => {
        test('success code 200', async () => {
            await request(app)
            .get('/v1/launches')
            .expect("Content-Type", /json/)
            .expect(200)
        });
    });
    describe('Test POST /v1/launches', () => {
        test('success code 201', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send({
                    "mission": "uranus ganswa",
                    "rocket": "basic23",
                    "launchDate": "2021-02-28",
                    "target": "kepler-1652 b",
                    "customers": ["ISRO", "NASA", "JAXA", "ROSCOM", "ESA"],
                    "upcoming": true,
                    "success": true,
                    "flightNumber": 1010
                })
                //supertest assertions
                .expect("Content-Type", /json/);
            //jest assertions
            expect(response.statusCode).toBe(201);
        })
        let cofirm_data = {
            "mission": "uranus ganswa",
            "rocket": "basic23",
           // "launchDate": new Date("feburary 27 2021"),
            "target": "kepler-1652 b",
            "customers": ["ISRO", "NASA", "JAXA", "ROSCOM", "ESA"],
            "upcoming": true,
            "success": true,
            // "flightNumber": 1011
        }
        test('Catch missing properties', async () => {
            //using .then chaining
            // return request(app)
            // .post('/launches')
            // .send({
            // 	mission:"keppler",
            // 	target:"urans",
            // 	launchDate:new Date('April 05 2046'),
            // 	upcoming:true,
            // 	success:true,
            // 	rocket:"kepler 1649b"
            // })
            // .then(data=>{
            // 	expect(data.body).toMatchObject(cofirm_data)
            // })
            //using async await
            const response = await request(app)
            .post('/v1/launches')
            .send({
                "mission": "uranus ganswa",
                "rocket": "basic23",
              	"launchDate": "feburary 27 2021",
                "target": "kepler-1652 b",
                "customers": ["ISRO", "chakka trum", "JAXA", "ROSCOM"],
                "upcoming": true,
                "success": true
            });
            expect(response.body).toMatchObject(cofirm_data);
        })
        //test('Invalid date',()=>{})
    });
    //console.log(message)
   afterAll(async()=>{
   	await disconnect_mongo();
   })
   
});