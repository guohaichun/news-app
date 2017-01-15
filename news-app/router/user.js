var express=require("express");
var mysql=require("../mysql.js");
var router=express.Router();

//注册
router.use("/reg",function(req,res,next){
    res.cookie("comming","yes",{signed:true});
    res.render("reg");
})
//注册账号验证
router.use("/regCheck",function(req,res,next){
    if(req.signedCookies.comming=="yes"){
        var username=req.body.username;
        var password=req.body.password;
        if(username==""||password==""){
            res.redirect("/error")
        }else{
            mysql.query("select * form user",function(error,rows){
                var flag=true;
                if(rows>0){
                    for(var i=0;i<rows.length;i++){
                        if(rows[i].username==username){
                            flag=false;
                            res.redirect("/error")
                            break;
                        }
                        if(flag){
                            mysql.query(`insert into user (username,password) values ('${username}','${password}')`,function(error,rows){
                                if(error){
                                    res.redirect("/mysqlerror")
                                }else{
                                    res.redirect("/regsuccess")
                                }
                            })
                        }
                    }
                }else{
                    mysql.query(`insert into user (username,password) values ('${username}','${password}')`,function(error,rows){
                        if(error){
                            res.redirect("/mysqlerror")
                        }else{
                            res.redirect("/regsuccess")
                        }
                    })
                }
                // console.log(rows);
                // res.send();
            })
        }
        // console.log("reg")
        // res.send("reg")
    }else{
        res.redirect("/")
    }

})
//登录
router.get("/login",function(req,res,next){
    if(req.signedCookies.login){
        res.redirect("/errorlogin2")
    }else{
        res.render("login");
    }
})
//登录验证
router.use("/loginCheck",function(req,res,next){
/*两种情况，成功退出，不成功写入信息 君子协议*/
    var username=req.body.username;
    var password=req.body.password;
    if(username==""||password==""){
        res.redirect("/error");
    }else{
        //console.log(req.body);
        mysql.query(`select * from user`,function(error,rows){
           var flag=true;
           for(var i=0;i<rows.length;i++){
               if(rows[i].username==username){
                   if(rows[i].password==password){
                       flag=false;
                       res.cookie("login","yes",{signed:true});
                       res.cookie("username",username,{signed:true});
                       res.redirect("/");
                       break;
                   }

               }
           }
            if(flag){
                res.redirect("./loginerror");
            }
        })
    }
})

router.use("/logout",function(req,res,next){
    res.clearCookie("login");
    res.redirect("/");
})
/*get换成use，既可以接受get，又可以接受post*/
module.exports=router;