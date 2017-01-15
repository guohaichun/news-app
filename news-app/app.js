var express=require("express");
var ejs=require("ejs");
var mysql=require("./mysql");
var body=require("body-parser");
var request=require("request");
var cheerio=require("cheerio");
var cookie=require("cookie-parser");
var child=require("child_process");
var async=require("async");
//主进程与子进程通信
var subProcess=child.fork("pull.js");
subProcess.on("message",function(info){
    console.log(info.toString());
})

var app=express();
app.listen(8880);

app.set("views","./views");
app.set("view engine",".html");
app.use("/static",express.static('public'));
app.engine(".html",require("ejs").renderFile);
app.use(body.urlencoded({ extended: true }));
//中间键
app.use(function(req,res,next){
    mysql.query("select * from category",function(error,rows){
        res.locals.categorys=rows;
        next();
    })
})
app.use(cookie("jia"));
//中间键
app.use(function(req,res,next){
    res.locals.login=req.signedCookies.login;
    next();
})
app.use(function(req,res,next){
    res.locals.username=req.signedCookies.username;
    next();
})

var user=require("./router/user.js");
var message=require("./router/message.js");
var reply=require("./router/reply.js");
app.use("/user",user);
app.use(message);
app.use("/reply",reply);


app.get("/",function(req,res){

        res.render("index");
})

app.get("/list/:id",function(req,res){
    // console.log(req.cookie)
    // /*获得未加密的cookie*/
    // console.log(req.signedCookie)
    // /*获得加密后的cookie*/
    // res.cookie("name","zhangsan");
    // /*第一次访问时存入cookie*/
    //  res.cookie('name','zhangsan',{signed:true});
    /*第一次访问时存入加密cookie*/
    // res.sginedCookie("name","zhangsan");
     var cid=req.params.id;
    mysql.query("select * from arc where cid="+cid,function(error,rows){
       if(!error){
           res.render("list",{lists:rows});
       }
    })
})

//app.get("/show/:id",function(req,res){
//    var id=req.params.id;
//    mysql.query("select * from arc where id="+id,function(error,rows){
//        if(!error){
//            mysql.query("select * from replay where aid="+id+"order by desc limit 0,2",function(error,rows1){
//                rows[0].aimg=rows[0].aimg.replace(";204c433878d5cf9size1_w16_h16.png","")
//                rows[0].aimg=rows[0].aimg.split(";");
//                res.render("show",{shows:rows,liuyan:rows1,aid:id});
//            })
//        }
//
//    })
//})
var obj={};
app.get("/show/:id",function(req,res){
    var id=req.params.id;
    async.series([
        function(cb){
            mysql.query("select * from arc where id="+id,function(error,rows){
                obj.shows=rows;
                cb();
            })
        },
        function(cb){
            mysql.query("select * from replay where aid="+id+" limit 0,2",function(error,rows){
                obj.liuyan=rows;
                obj.name=req.signedCookies.username;
                obj.aid=id;
                cb();
            })
        }
    ],function(){
        res.render("show",obj);
        console.log("ok!!")
    })
});
app.post("/ajax",function(req,res){
    var num=req.body.num*5;
    var cid=req.body.cid;
    // console.log(num,cid);
    // res.send(num);
    setTimeout(function(){
        mysql.query("select * from arc where cid="+cid+" limit "+num+",5",function(error,rows){
            // console.log(rows)
            res.send(JSON.parse(rows));
        },1000)
    })
})

//侧滑
app.post("/express",function(req,res1){
    var url=req.body.url;
    request(url,function(req,res,body){
        var $=cheerio.load(body);
        var arr="";
        $("#navmenu>li").each(function(){
            var con=$(this).find("a").html;
            arr+=con+"|";
        });
        res1.send(arr.slice(0,-1));
    })
})
