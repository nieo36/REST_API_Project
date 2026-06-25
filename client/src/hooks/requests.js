const api_url='v1'; 

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${api_url}/planets`,{method:'GET'} )
  //console.log(response.json());
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready. 
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${api_url}/launches`,{method:'GET'} )
  const fetchedata=await response.json();
  return fetchedata.sort((a,b)=>{
    return a.flightNumber - b.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
    // console.log(JSON.stringify(launch));
  try{
    return await fetch(`${api_url}/launches`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(launch)
  })
}
catch(err){
  console.log(err);
  return {ok:false}
}
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
  return await fetch(`${api_url}/launches/${id}`,{
    method:"DELETE"
  })
}
catch(err){
  console.log(err);
  return {ok:false}
}
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};

