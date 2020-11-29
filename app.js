//jshint esversion:6


const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>{
  const apiKey = "ced013f5ee8b3e4b46da5f0b2680651c";
  const queryByZipCode = req.body.zipCode;
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + queryByZipCode + "&appid="+ apiKey + "&units=" + units;



  https.get(url, (response)=>{
    console.log(response.statusCode);


    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const name = weatherData.name;

      res.write("<h1>The Temperature for Today in " + name + " is: "+ temp+ " Celcius" +"<img src="+image+">"+"</h1>");


  });
});
});





app.listen(3000,()=>{

  console.log("server is running on port 3000");

});
