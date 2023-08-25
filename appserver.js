const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
    });
    app.post("/",function(req,res){
    const query=req.body.cityName;
    const units="metric";
    const apikey="00288513028f004148d3566cc2afce5a";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
           
            res.write("<p>The weather is "+ weatherDesc+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp +" degree celcius. </h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
   
    });

 app.listen(3000,function(){
    console.log("Server is running at port 3000");
 })