var express=require("express");
var router=express.Router();

router.use("/error",function(req,res,next){
    res.render("error",{title:"错误消息",con:"用户名或密码错误",url:"/user/reg"});
})
router.use("/mysqlerror",function(req,res,next){
    res.render("error",{title:"错误消息",con:"数据处理错误",url:"/"});
})
router.use("/regsuccess",function(req,res,next){
    res.render("error",{title:"注册成功",con:"请登录",url:"/user/login"});
})
router.use("/loginerror",function(req,res,next){
    res.render("error",{title:"登录失败",con:"请再次登录",url:"/user/login"});
})
router.use("/loginerror2",function(req,res,next){
    res.render("error",{title:"登录失败",con:"已经登录",url:"/"});
})
module.exports=router;