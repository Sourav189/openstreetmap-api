//jshiht esversion:6
const  express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
//const fetch = require("node-fetch");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/",function(req,res){
  res.render("index");
})
app.post("/getAddress",function(req,res){

// console.log(req.body.search);
// (async () => {
//   try {
//
//     const response = await fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1&email=souravmahi18@gmail.com')
//     const json = await response.json()
//   //  var data = JSON.parse(json);
//     // var lat = data.lat;
//     console.log(json[0].lat);
//     // console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// })();
   var input = req.body.search;
   var baseUrl = "https://nominatim.openstreetmap.org/?addressdetails=1&q=";
   var endUrl= "&format=json&limit=1&email=souravmahi18@gmail.com";
   var finalUrl = baseUrl + input + endUrl;

//   console.log(finalUrl);
//   console.log(input);
   //"https://nominatim.openstreetmap.org/?addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1&email=souravmahi18@gmail.com"
  request(finalUrl,(error,response,body)=>{
    if(!error){
    var data = JSON.parse(body);
    console.log(data);

    const streetAddress = data[0].address.road;
    const city = data[0].address.city;
    const state = data[0].address.state;//optional some times come and some times not
    const country = data[0].address.country;
    const lat = data[0].lat;
    const lon = data[0].lon;

   res.render("address", {input:input,streetAddress : streetAddress, city : city, country : country,lat : lat, lon : lon});
   // res.write("<h1>The Complete Address of the "+ input + " is :-</h1>");
   // res.write("<p>Street Address : "+ streetAdress+ " ,</p>");
   //  res.write("<p>City : "+city+" ,</p>");
   //  res.write("<p>Country : "+country+ " ,</p>");
   //  res.write("<p> Latitude : "+lat+" and Longitude : "+lon+" .</p>");
   //  res.send();
}else{
  console.log(error);
}
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
