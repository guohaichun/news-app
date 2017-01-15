var request=require("request");
var cheerio=require("cheerio");
var mysql=require("./mysql");


module.exports.readCategory=function(url,callback){
    request(url,function(error,head,body){
        var $=cheerio.load(body);
        var arr=[];
        $(".col_nav ul li").each(function(index,obj){
            if(index==2||index==3||index==4||index==6){
              var obj={};
              var cname=$(this).find("a").html();
              cname=unescape(cname.replace(/&#x/g,"%u").replace(/;/g,""));
              obj.cname=cname;
              var url=$(this).find("a").attr("href");
              obj.curl=url;
              obj.cid=index;
              arr.push(obj);
            }
        })
        callback(arr);
    })

}


module.exports.readList=function(url,callback){
    var arr=[];
    request(url,function(error,head,body){
        var $=cheerio.load(body);
        $(".juti_list h3 a").each(function(){
            arr.push($(this).attr("href"));
        })
        callback(arr);
    })

}


module.exports.readCon=function(url,callback){
    request(url,function(error,head,body){
        var $=cheerio.load(body);
        var obj={};
        var atitle=$("#artical_topic").html()?$("#artical_topic").html():"";
        atitle=unescape(atitle.replace(/&#x/g,"%u").replace(/;/g,""))
        obj.atitle=atitle;
        var acon=$("#main_content").html()?$("#main_content").html():"";
        var imgs="";
        acon=acon.replace(/<img[^src]+src="([^"]+)"/g,function(one,two){
            imgs+=two+";";
            return one;
        }).replace(/<[^>]+>|<\/[^>]+>/g,"").replace(/\n/g,"");
        acon=unescape(acon.replace(/&#x/g,"%u").replace(/;/g,""))
        obj.acon=acon;
        obj.aimg=imgs.slice(0,-1);
        callback(obj);
    })
}


