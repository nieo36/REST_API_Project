const mongoose = require('mongoose');
exports.connect_mongo = async (mongo_url) => {
    await mongoose.connect(mongo_url);
};
mongoose.connection.once('open', () => {
    console.log("MongoDb is ready!!!")
})
mongoose.connection.on('error', (err) => {
    console.error(err);
})

exports.disconnect_mongo=async()=>{
	await mongoose.disconnect();
	//completely closes all connnections
	//await mongoose.connection.close();
	//close only single connection
}
// module.exports=connect_mongo;