var express=require("express");
var mysql=require("../mysql");
var router=express.Router();

router.use("/ajax",function(req,res,next){
    if(req.signedCookies.login){
        var con=req.body.con;
        var aid=req.body.aid;
        var time=new Date().getTime();
        var username=req.signedCookies.username;
        mysql.query(`insert into replay (con,aid,username,time) values ('${con}','${aid}','${username}','${time}')`,function(error,rows){
           if(error){
               res.send("error");
           }else{
               res.send("yes");
           }
        })
    }else{
        res.send("no")
    }
})
router.use("/more/:id",function(req,res){
    var id=req.params.id;
    mysql.query("select * from replay where aid="+id+"order by id desc",function(error,rows){
        console.log(rows)
        res.render("more",{more:rows})
    })

})

module.exports=router;