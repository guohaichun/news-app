var libs=require("./libs");
var write=require("./write");
var async=require("async");
var mysql=require("./mysql")
var path=require("path");
var categoryInfo;
var listInfo=[];
//libs.readCategory("http://news.ifeng.com/",function(data){
//    console.log(data);
//})
//libs.readList("http://news.ifeng.com/mainland/",function(data){
//    console.log(data);
//})
//libs.readCon("http://news.ifeng.com/a/20161224/50468800_0.shtml",function(data){
//    console.log(data);
//})
//write.writeCategory("http://news.ifeng.com/",function(newdata){
//    console.log(newdata);
//})
//write.writeCon("http://news.ifeng.com/a/20161224/50468800_0.shtml",function(data){
//    console.log(data);
//})
module.exports=function(){
    async.series([
        function(cb){
            write.writeCategory("http://news.ifeng.com/",function(data){
                categoryInfo=data;
                //console.log(categoryInfo);
                cb();
            })
        },
        function(cb){
            async.each(categoryInfo,function(obj,cb1){
                libs.readList(obj.curl,function(list){
                    var obj1={};
                    obj1.url=list;
                    obj1.cid=obj.cid;
                    listInfo.push(obj1);
                    cb1();
                })

            },function(){
                cb();
                //console.log(listInfo);
            })

        },
        function(cb){
            //var i=0;
            async.each(listInfo,function(obj,cb1){
                async.each(obj.url,function(url,cb2){
                    write.writeCon(url,function(data){
                        console.log(data)
                        var basename="";
                        var imgarr=data.aimg.split(";");
                        for(var i=0;i<imgarr.length;i++){
                            basename+=path.basename(imgarr[i])+";";
                        }
                        basename=basename.slice(0,-1);
                        mysql.query(`replace into arc (atitle,acon,aimg,cid) values ('${data.atitle}','${data.acon}','${basename}',${obj.cid})`,function(error){
                            cb2();
                        })
                    })
                },function(error){
                    cb1();
                })
            },function(error){
                cb();
            })
        }

    ],function(){
        console.log("over");
    })
}
