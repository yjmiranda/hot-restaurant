const express = require("express");
const path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var tables = [];
var waitList = [];

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/api/tables", function(req,res){
    res.json(tables);
});

app.get("/api/wait-list", function(req,res){
    res.json(waitList);
});

app.get("/table-list", function(req, res){
    res.sendFile(path.join(__dirname,"table-list.html"));
});

app.get("/reserve-table",function(req,res){
    res.sendFile(path.join(__dirname, "reserve-table.html"));
});

app.post("/api/tables/new",function(req,res){
    var newTable = req.body;

    console.log(newTable);

    if(tables.length > 5){
        waitList.push(newTable);
    } else {
        tables.push(newTable);
    }
    
    res.json(newTable);
});
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});