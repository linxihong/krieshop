/**
 * Created by Administrator on 2017/12/8 0008.
 */
/***功能点1：检查用户的登录情况，没有登录信息，必须跳转到登录页**/

if(!sessionStorage['uid']){
    location.href = 'login.html';
}
/**功能点2：点击左侧的附加导航项，右侧内容随之实现切换*/

$('.affix').on('click','li>a',function(e){
    //阻止事件绑定
    e.preventDefault();
    //切换li的激活

    $(this).parent().addClass('active').siblings().removeClass('active');
    //切换div的激活
    var id = $(this).attr('href');
    $(id).addClass('active').siblings().removeClass('active');
})

/**功能点3：当页面加载完成，异步请求当前用户的所有订单**/
var uid = sessionStorage.getItem("uid");
$.ajax({
    url: 'data/my_order.php',
    data:{uid:uid},
     success:function(list){
        var html = '';
        $.each(list,function(i,order){
            html +=`
            <tr>
                  <td colspan="6">订单编号：${order.oid}</td>
                </tr>
                <tr>
                  <td>`;
            //循环图片
            $.each(order.productList,function(j,p){
                    html += `<a href="#"><img src="${p.pic}" alt="">`
            })
            html +=`
                  
                  </td>
                  <td>${order.rcvName}</td>
                  <td>￥${order.price}<br><span class="payment">${order.payment}</span></td>
                  <td><span class="orderTime">${order.orderTime}</span></td>
                  <td><span class="status">${order.status}</span></td>
                  <td>
                    <a href="#">查看</a><br>
                    <a href="#">晒单</a>
                    <a href="#">评价</a><br>
                    <a href="#">还要买</a><br>
                  </td>
                </tr>            
`
        });
        $('#table-order tbody').html(html);
        //调用函数替换文字
         formatTableData();

     },
    error:function(){
         alert('异步请求用户订单数据失败！请检查sql语句！')
    }
});
function formatTableData(){
//把订单支付方式由1/2/..改为有效的说明文字
$('#table-order .payment').each(function(){
    var t = $(this).html();
    switch(t){
        case '1':
            t = '货到付款';
            break;
        case '2':
            t = '银联支付';
            break;
        case '3':
            t = '支付宝支付';
            break;
        default:
            t='不可识别的支付方式'
    }
    $(this).html(t);
});
//把下单时间由BIGIND 转换为 y-m-d <br>h:m:s格式
    $('#table-order .orderTime').each(function(){
        var t = $(this).html();
        t = parseInt(t);
        t= new Date(t);
        t = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+'<br>'+t.getHours()+':'+t.getMinutes();
        $(this).html(t)
    })
    //将状态修改为文字
    $('#table-order .status').each(function(){
        var t = $(this).html();
        switch(t){
            case '1':
                t = '配送中';
                break;
            case '2':
                t = '运输中';
                break;
            case '3':
                t = '已签收';
                break;
            default:
                t='删除'
        }
        $(this).html(t);
    });
}

/**功能点4：根据消费统计数据，绘制统计图表**/
//获取数据
$.ajax({
    url:'data/buy_stat.php',
    data:{uid:uid},
    success:function(list){
        //使用FusionCharts绘制统计图表
        var c = new FusionCharts({
            type:'doughnut3d',//'column3d//'column2d''//这里可以修改不同图表类型，在官网找
            //渲染到哪里的位置
            renderAt:'container-buy-stat-svg',
            //设置宽和高
            width:'90%',
            height:'500',
            dataSource:{
                data:list//返回数据和数据一样
            }
        });
        //对图标进行渲染出来
        c.render();
    }
})

/**功能点6：页面加载完成时，异步请求当前登录用户的抽奖统计数据*/

$.ajax({
    url:'data/lottery_stat.php',
    data:{uid:uid},
    success:function(result) {
        if (result.total <= result.used) {
            $('#bt-lottery').html('无法抽奖（剩余抽奖次数为零）');
            return;
        }
        //还有剩余抽奖次数 ???.prop('disabled',false); .prop是设置对象的属性
        $('#bt-lottery').html(`开始抽奖（总次数:${result.total},剩余次数:${result.total - result.used}）`).prop('disabled', false);

        //加载两张抽奖必须的图片，全部加载完成开始绘图
        var progress = 0;//总的加载进度
        var imgPan = new Image();
        imgPan.src = 'img/pan.png';
        imgPan.onload = function(){
            progress +=80;
            if(progress===100){
                initDraw();//开始绘图

            }
        }
        var imgPin = new Image();
        imgPin.src = 'img/pin.png';
        imgPin.onload = function(){
            progress +=20;
            if(progress===100){
                initDraw();//开始绘图
            }

        }
        //开始绘图
        function initDraw(){
            var w = imgPan.width;
            var h = imgPan.height;
            var c = $('#canvas-lottery')[0];
            c.width = w;
            c.height = h;
            var ctx = c.getContext('2d');
            ctx.drawImage(imgPan,0,0);
            ctx.drawImage(imgPin,w/2-imgPin.width/2,h/2-imgPin.height/2);

        }
    }

});
//个人中心
/*左边附加导航切换*/

$("#safe").click((e)=>{
    e.preventDefault();
    $("#safe").addClass("current");
    $("#mySign").removeClass("current");
    $(".rs_content").css("display","none");
    $(".safe_content").css("display","block");
});

$("#safe").click((e)=>{
    e.preventDefault();
    $("#safe").addClass("current");
    $("#mySign").removeClass("current");
    $(".rs_content").css("display","none");
    $(".safe_content").css("display","block");
});
$("#mySign").click((e)=>{
    e.preventDefault();
    $("#safe").removeClass("current");
    $("#mySign").addClass("current");
    $(".rs_content").css("display","block");
    $(".safe_content").css("display","none");
});
//设置右侧购物车按钮隐藏
$("#cart-show").css("display","none");
$("#cart-in").css("display","none");


