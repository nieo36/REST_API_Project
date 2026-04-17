const {planets,getPlanets} = require('../../model/planets.model.js');

async function getAllPlanets(req,res,next){
	//console.log("get request on planets");
	//console.log(await getPlanets());
	return res.status(200).json(await getPlanets());
}
module.exports={ 
	getAllPlanets
}

 