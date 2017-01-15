var request=require("request");
var cheerio=require("cheerio");
var async=require("async");
var mysql=require("./mysql.js");
request("http://news.ifeng.com/",function(error,head,body){
    var $=cheerio.load(body);
    var arr=[];
    $(".col_nav ul li").each(function(){
        var str=$(this).find("a").html();
        //console.log(str)
        var cname=unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));
        var curl=$(this).find("a").attr("href");
        var strs=`insert into category(cname,curl) values ('${cname}','${curl}')`;
        arr.push(strs);
    })

    async.each(arr,function(strs,callback){
        mysql.query(strs,function(){
            callback();
        })
    },function(){
        console.log("插入成功");
        mysql.end();  //关闭数据库，循环处理批量并行
    })
})
