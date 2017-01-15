$(function(){
    $(".liuyanBtn").click(function(){
        $(this).css({"display":"none"});
        $(".liuyan").css({"display":"block"});
    });
    $(".quxiao-btn").click(function(){
        $(".liuyanBtn").css({"display":"block"});
        $(".liuyan").css({"display":"none"});
    });
    $(".submit-btn").click(function(){
        var that=this;
        var date=new Date();
        var year=date.getFullYear();
        var mon=date.getMonth();
        var datas=date.getDate();
        var hour=date.getHours();
        var min=date.getMinutes();
        var send=date.getSeconds();
        var time=year+"-"+mon+"-"+datas+" "+hour+":"+min+":"+send;
        $.ajax({
            url:"/reply/ajax",
            type:"post",
            data:{con:$("textarea").val(),aid:location.pathname.slice(location.pathname.lastIndexOf('/')+1),time:time},
            success:function(e){
                //console.log(e);
                if(e=="no"){
                    $(".notice").css({"display":"block"});
                    $(".back").click(function(){
                        $(".notice").css({"display":"none"});
                    })
                }else if(e=="yes"){
                    $(".tishi").css({"display":"block"});
                    setTimeout(function () {
                        $(".tishi").css({"display":"none"});
                        $(`<li>
                <h4>${$("textarea").val()}</h4>
                留言人：<span>${$(that).attr("attr")}</span>&nbsp&nbsp时间：<span>${time}</span>
            </li>`).prependTo(".liuyan-xs");
                    },1000)
                }
            }
        });
    });

    $(".line1").click(function(){
        history.go(-1);
    })


});