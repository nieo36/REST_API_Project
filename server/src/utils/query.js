module.exports = function pagination(query){
	const limit=Math.abs(query.limit)||50;
	const page=Math.abs(query.page)||1;
	const skip=(page-1)*limit;

	return{skip,limit};
}


