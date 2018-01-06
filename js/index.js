/**
 * Created by Administrator on 2017/11/16 0016.
 */

/**广告轮播*/
/***广告图片数组***/
var imgs=[
    {"i":0,img:"img/banner/banner01.png"},
    {"i":1,img:"img/banner/banner02.png"},
    {"i":2,img:"img/banner/banner03.png"},
    {"i":3,img:"img/banner/banner04.png"},
    {"i":4,img:"img/banner/banner05.png"},
];
var slider={
    LIWIDTH:670,//保存每个li的宽度
    $ulImgs:null,//保存id为imgs的ul
    $ulIdxs:null,//保存id为indexs的ul
    DURATION:500,//保存单次移动的时间
    WAIT:3000,    //保存轮播的等待时间
    moved:0,     //保存已经左移的li个数
    init(){
        var me =this;
        //选择id为imgs的ul保存到$ulImgs中
        me.$ulImgs = $("#imgs");
        //选择id为idexs的ul保存到$ulIdxs中
        me.$ulIdxs=$("#indexs");
        me.initViem();//初始化界面
        me.autoMove();//启动自动轮播
        //当鼠标进入slider，停止轮播，当鼠标移出，再次启动
        $("#slider").hover(function(){
            me.$ulImgs.stop(true);
        },function(){
            me.autoMove();
        });
        //为ulImgs添加鼠标进入事件监听，只允许li>img响应事件
        me.$ulImgs.on("mouseover","li>img",function (e) {
            var $tar = $(e.target);
            //获取当前img的下标
            var i = $tar.index("#imgs img");
          me.moved=i;
           //修改ulImgs的left为move*LIWIDTH
            me.$ulImgs.css("left",-me.moved*me.LIWIDTH);
            me.changeHover();
        });
        //为ulIdxs 添加鼠标进入事件，只允许li响应
        me.$ulIdxs.on("mouseover","li",function(e){
            var $tar = $(e.target);
            if(!$tar.is(".hover")){
                var endi=$tar.index("#indexs>li");
                var starti = $(".hover").index("#indexs>li");
               //修改moved为endi-starti
                me.moved+=(endi-starti);
                me.changeHover();//立即修改hover
                //让$ulImgs移动到moved*LIWIDTH的位置
                me.$ulImgs.stop(true).animate({left:-me.moved*me.LIWIDTH},me.DURATION);

            }
        })

    },
    autoMove(){//自动轮播
        var me =this;
        me.moved++;
       //先等待WAIT，再移动到moved*LIWDTH
        me.$ulImgs.delay(me.WAIT).animate({
            left:-me.moved*me.LIWIDTH
        },me.DURATION,function(){
            //本地移动后 再启动自动轮播
            //如果moved等于imgs的个数
            if(me.moved==imgs.length){
                me.$ulImgs.css("left",0);
                //将ulImgs的left归0
                me.moved=0;//将moved归0
            }
            me.changeHover();//回调函数
            me.autoMove()//再次启动自动轮播
        });
    },
    //构造函数，将ulIdxs中moved位置的圆点添加hover，去掉兄弟的hover
    changeHover(){
        this.$ulIdxs.children().eq(this.moved).addClass("hover").siblings().removeClass("hover")
    },
    initViem(){
        //将imgs数组的内容生成页面元素
        //遍历imgs中每个img，同时声明空字符串htmlImgs和htmlIdxs
        for(var i=0,htmlImgs="",htmlIdxs="";i<imgs.length;i++){
            //向htmlImgs中拼接：
            htmlImgs+=`<li><img src='${imgs[i].img}'></li>`
            //向htmlIdxs中拼接
            htmlIdxs+=`<li>${i+1}</li>`
        } //遍历结束
        //设置$ulImgs的html内容为htmlImgs
        this.$ulImgs.html(htmlImgs).css("width",(imgs.length+1)*this.LIWIDTH);
        //设置$ulImgs的宽度为imgs的imgs的元素个数*LIWIDTH
        //在$ulImgs中追加一个第一个元素的clone
        this.$ulImgs.append(this.$ulImgs.children(":first").clone());
        //设置$ulIdxs的html内容为htmlIdxs
        this.$ulIdxs.html(htmlIdxs);
        //设置$ulIdxs中第？个li添加hover class
        this.$ulIdxs.children().eq(imgs[0].i).addClass("hover");
    },
}
slider.init();

/************楼层轮动*************/

/***************秒杀区倒计时******************/
   var date2 = new Date("2218/1/1 00:00:01");//设置倒计时的终止时间
var countdown = setInterval(function(){
    var date1 = new Date();
    var date = (date2.getTime()-date1.getTime())/1000;
    var hour = parseInt(date/3600%24);//小时
    var minute = parseInt(date/60%60);//分钟
    var second = parseInt(date%60);//秒

    $("#hour").text(hour)
    $("#minute").text(minute);
   $("#second").text(second) ;
    if(hour <= 0&&minute <= 0&&second <= 0){
        $(".sec_fr rt").html = "2018年1月1日的倒计时已到";
        clearInterval(countdown);
        return false;
    }
},1000)

/**广告轮播小图***/
var WIDTH=$(" #main_add>li").width();

$(".previous").on("click", function() {
    console.log(WIDTH);
    var left = (-WIDTH);
    $("#main_add").animate({
        left: left + "px"
    }, function() {
        $(" #main_add>li").eq(0).appendTo("#main_add"); //把第一个LI搬到尾部
        $("#main_add").css("left", "0px"); //重置UL的位置
    });
});
$(".next").on("click", function(e) {

    var li_length = $(" #main_add>li").length - 1;
    $("#main_add>li").eq(li_length).prependTo("#main_add"); //移动前先把最后一个LI搬到UL前面，补齐UL向右移动后前面的缺口
    $("#main_add").css("left", WIDTH + "px") //搬完后重置LEFT，不然不能产生动画哦
    $("#main_add").animate({
        left: "0px"
    });
    console.log(li_length)
})

/*楼层标签页切换-开始-*/
$(".floor_list>li").on("mouseover", function() {
    var index = $(this).index();
    var parents = $(this).parents(".floor").attr("id"); //获取当前楼层
    var ul = $("#" + parents).find(".floor_main"); //找到当前楼层的标签页，执行显示或隐藏
    ul.eq(index).show().siblings().hide(); //
    $(this).addClass("on_floor_list").siblings().removeClass("on_floor_list");
})
/*楼层标签页切换-结束-*/
