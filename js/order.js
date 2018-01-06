/**
 * Created by Administrator on 2017/11/19 0019.
 */
/****第一 ：检查用户是否登录，若未登录，则跳转到登录页面***/
var uid = sessionStorage.getItem("uid");
if(!uid){
    location.href='login.html';
}
/***第二 异步加载页头和页尾***/


/***第三 异步请求该用户购物车中所有商品***/
$.ajax({
    type:'GET',
    url:'data/cart_detail.php',
    data:{uid:uid},
    success:function(list){
        var html = '';
        var totlePrice=0;
        var totleCount=0;
        $.each(list,function(i ,p){
            totlePrice +=p.price*p.count;//总金额
            totleCount += parseInt(p.count);//总数量
           html += `
                    <div class="goods-item">
                                <div class="p-img">
                                    <a target="_blank" href=""><img src="${p.pic}" alt=""></a>
                                </div>
                                <div class="p-name">
                                    <a href="" target="_blank">
                                        ${p.pname}
                                    </a>
                                </div>
                                <div class="p-price">
                                    <strong class="jd-price">￥${p.price}</strong>
                                    <span class="p-num">x${p.count}</span>
                                    <span class="p-state">有货</span>
                                </div>
                            </div>`

        });
        $('div.goods-items').html(html);
        $('#sum_price').html(`¥${totlePrice.toFixed(2)}`);//总金额
        $('#sum_count').html(`${totleCount}`);//总数量
        $(':hidden[name="price"]').val(totlePrice);

    }

});

/**点击不同的支付方式，修改同级的隐藏 payment**/
$(".payment-list").on('click',"li",function(){
    $(this).addClass('payment-item-selected').siblings().removeClass("payment-item-selected");
    //获取li对应的value，赋值给隐藏域
    var v = $(this).data('value');
    $(this).siblings(':hidden').val(v);
})


/**点击“提交订单” 序列化表单form-order，异步提交给服务器页面**/
$('.checkout-submit').click(function(){
    var data = $('#form-order').serialize();
    //追加userid
    data +=`&userId=${uid}`
   //异步提交用户输入/选中的数据，实现订单添加
    $.ajax({
        type:'POST',
        url:'data/order_add.php',
        data:data,
        success:function(result){
            if(result.code===1){
                sessionStorage['OrderId']=result.orderId;
                location.href = 'addorder_succ.html';
            }else{
                alert('订单生成失败！失败原因：'+result.msg);
            }
        },
        error:function(){
            alert('异步提交订单数据失败！请检查')
        }
    })
})