function resize(originSize,type){
    var type=type||"x";
    if(type=="x"){
        var cw=document.documentElement.clientWidth;
        var scale=cw/originSize*100;
    }else if(type=="y"){
        var ch=document.documentElement.clientHeight;
        var scale=ch/originSize*100;
    }
    var html=document.querySelector("html");
    html.style.fontSize=scale+"px";
}
resize(1334,"y");