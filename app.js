const express = require("express");
const lodash = require("lodash");
const app = express();
app.set("view engine", "ejs");

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages();
 
 console.dir("parsedData: " + parsedData); //displays content of the object
parsedData.hits = lodash.shuffle(parsedData.hits);
 res.render("index", {"images":parsedData});
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let parsedData = await getImages(keyword);
    parsedData.hits = lodash.shuffle(parsedData.hits);
    res.render("results", {"images":parsedData});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                //res.send(`<img src='${parsedData.hits[randomIndex].webformatURL}'>`);
                //res.render("index", {"image":parsedData.hits[randomIndex].webformatURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});