$(function(){
// 设置比例大小，进行比例布局
    function resize(originsize,type){
        var type=type||"x";
        var widths=document.documentElement.clientWidth;
        var heights=document.documentElement.clientHeight;
        if(type=="x"){
            var scale=widths/originsize*100;
        }else if(type=="y"){
            var scale=heights/originsize*100;
        }

        document.getElementsByTagName("html")[0].style.fontSize=scale+"px";
    }

    resize(1334,"y");

    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',

        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationClickable: true,
        //开启动画
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })





})