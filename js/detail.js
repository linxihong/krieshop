/**
 * Created by Administrator on 2017/11/15 0015.
 */

(()=>{
 var uid = sessionStorage.getItem("uid");

 if(!uid){
     location.href='login.html';
 }
/***第二 异步请求该用户购物车中所有商品***/
var pid = location.search.split("=")[1];
console.log(pid);
$.ajax({
    type:'GET',
    url:'data/details.php',
    data:{pid:pid},
    success:function(result){
        var html = '';
         var mImg = result.pics[0].md;
            html+=` 
             <div id="medumDiv">
                    <img src="${mImg}" alt="" id="mImg">
                    <div id="mask"></div>
                    <div id="superMask"></div>
                </div>
                `
                html +=`
                <div id="largeDiv"></div>
                <h1>
                    <a class="backward_disabled"></a>
                    <ul class="sm_box" id="icon_list">
                    `
                     for(var p of result.pics){
              html +=`
                        <li><img src="${p.sm}" alt=""></li>                    
                 `
                     }
                         html+=`
                    </ul> 

                    <a class="forward"></a>
                </h1>
                             `


        $('#preview').html(html);

        //
        var preview={
            LIWIDTH:62,//每个li的宽度
            $ul:null,//保存小图片列表的ul
            moved:0,  //保存已经了的li的个数
            $mask:null,//保存半透明遮罩
            MSIZE:225,//保存mask的大小
            SMSIZE:450,//保存superMask的大小
            MAX:0,//保存mask可以用的最大top和left
            $lg:null,//保存largeDiv
            init(){//初始化功能
                //按id为icon_list查找ul保存到$ul中
                this.$ul=$("#icon_list");
                this.MAX= this.SMSIZE-this.MSIZE;
                //为两个a绑定点击事件
                $("#preview>h1>a").click(function(e){
                    //a的class不以_disabled结尾
                    //console.log(!$(e.target).is("[class$='_disabled']"));
                    if(!$(e.target).is("[class$='_disabled']")){
                        //如果a是forward  让ul的left-LIWIDTH
                        if($(e.target).is(".forward")){
                            this.$ul.css("left",parseFloat(this.$ul.css("left"))-this.LIWIDTH);
                            this.moved++;
                        }else{
                            this.$ul.css("left",parseFloat(this.$ul.css("left"))+this.LIWIDTH);
                            this.moved--;
                        }
                        this.checkA();//检查a的状态
                    }
                }.bind(this));//???
                //小图转中图
                //为$ul添加鼠标进入事件委托，只允许li下的img响应事件
                this.$ul.on("mouseover","li>img",function(){
                    //获取当前img的src
                    var src=$(this).attr("src");
                    //在src最后一个前插入-m,生成新的src
                    var i =src.lastIndexOf(".");
                    //设置id为mImg的src为新的src
                    src=src.slice(0,i)+"_m"+src.slice(i);
                    console.log(src);
                    $("#mImg").attr("src",src);
                });
                //选择id为mask的半透明遮罩保存在$mask中
                var $mask = $("#mask");
                //选择id为largeDIV的半透明遮罩
                var $lg = $("#largeDiv")
                //为id为superMask绑定hover
                $("#superMask").hover(function(){
                    //切换idweimask的显示隐藏
                    $mask.toggle();
                    $lg.toggle();
                    //获得mImg的src
                    var src = $("#mImg").attr("src");
                    var i = src.lastIndexOf(".");
                    src=src.slice(0,i-1)+"l"+src.slice(i);
                    //这是$lg的背景图片为src
                    $lg.css("backgroundImage","url("+src+")");
                    //继续绑定鼠标移动事件
                }.bind(this)).mousemove(function(e){
                    //获取鼠标的x,y坐标
                    var x =e.offsetX;
                    var y =e.offsetY;
                    //获取鼠标相对于superMask的x,y的坐标
                    //用x,y坐标-1/2mask大小，算出top和left
                    var top = y-this.MSIZE/2;
                    var left=x-this.MSIZE/2;
                    //如果top<0，就改回0
                    if(top<0){
                        top=0;
                    }else if(top>this.MAX){
                        top=this.MAX;
                    }
                    //否则，如果top>max,就改回max
                    //如果left<0,就改回MAX
                    if(left<0){
                        left=0;
                    }else if(left>this.MAX){
                        left=this.MAX;
                    }
                    //否则 如果left>max,就改回max
                    //设置mask的top和left值
                    $mask.css({top,left})//简写 "top"：top，"left":left
                    //修改$lg的背景位置
                    $lg.css("backgroundPosition",`${-16/9*left}px ${-16/9*top}px`);
                    //800/450 = 16/9
                }.bind(this));

            },
            checkA(){//每次移动后，检查两个a的状态
                if(this.moved==0){
                    $("[class^='backward']").attr("class","backward_disabled")
                }else if(this.$ul.children().size()-this.moved==6){
                    $("[class^='forward']").attr("class","forward_disabled")
                }else{
                    $("[class='backward_disabled']").attr("class","backward");
                    $("[class^='forward']").attr("class","forward");
                }
                //如果moved == 0
                //禁用backward
                //否则，如果
            }
        }
        preview.init();
    },
    error:function(){
        alert("产品列表响应完成但有问题");
    }
})



// 商品介绍-----标签切换(思路就是先把所有的div隐藏，点击加show)
$("#product_details>.main_tabs").on("click","li:not(.current)",function(){
    //this->li
    $(this).addClass("current").siblings().removeClass("current");
    //内容的切换
    //隐藏所有容器
    if($(this).is(":contains('商品评价')")){
        $("#product_details>[id^='product']").removeClass("show");
    }else {
        //获取当前li的下标
      var i=$(this).index("#product_details>.main_tabs>li:not(:contains('商品评价'))");
      //alert(i);
        $("#product_details>[id^='product']").eq(i).addClass("show").siblings().removeClass("show");
    }
})

//放大镜
//小图的移动


})()