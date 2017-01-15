var http=require("http");
var fs=require("fs");
var mysql=require("./mysql");
var libs=require("./libs");
var async=require("async");
var path=require("path");

module.exports.writeCategory=function(url,callback){
    var newdata;
    libs.readCategory(url,function(data){
        newdata=data;
        async.each(data,function(obj,cb){
            mysql.query(`replace into category(cname,curl,cid) values ('${obj.cname}','${obj.curl}',${obj.cid})`,function(){
                cb();
            })
        },function(error,data){
            console.log("category done");
            callback(newdata);
        })
    })
}

module.exports.writeCon=function(url,callback){
    var newdata;
    libs.readCon(url,function(data){
       newdata=data;
       if(data.aimg!==""){
           var imgarr=data.aimg.split(";");
           async.each(imgarr,function(url,cb){
               if(/\.(jpg|png|gif|jpeg)/.test(url)){
                   http.get(url,function(res){
                       var basename=path.basename(url);
                       res.pipe(fs.createWriteStream("./public/img/"+basename));
                       cb();
                   })
               }
           },function(){
               callback(newdata);
           })
       }

   })
}

