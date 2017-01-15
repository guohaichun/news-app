var express=require("express");
var ejs=require("ejs");
var mysql=require("./mysql");
var app=express();
app.listen("8080");
app.set("views","./views");
app.set("view engine","ejs");
app.get("/",function(req,res){
    mysql.query("select * from category",function(error,rows,fileds){
        res.render("index",{arr:rows});
    })

})
