export default async function handler(req ,res){
    const lat=req.query.lat;
    const lon=req.query.lon;

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=bbfad02fb6514b2cb08165523260206&q=${lat},${lon}&aqi=yes`)
    const data = await response.json(); 
    res.status(200).json(data); 
}
