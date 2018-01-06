/**
 * Created by Administrator on 2017/11/17 0017.
 */
(()=>{
    //读取url中的关键词?kw=xxxxxxxx
    var kw=location.search.split("=")[1]||"";
    //ajax请求服务器端查询包含关键词的商品
    kw=decodeURI(kw);
// /***当页面加载完后，异步请求产品列表**/
var uid = sessionStorage.getItem("uid");
    if(!uid){
        location.href='login.html';
    }
console.log(uid);
loadProductByPage(0,9);
//异步请求商品数据，修改商品列表，修改分页内容
function loadProductByPage(pno,pageSize){
    $.ajax({
        type: "GET",
        // url:'data/product_select.php',
        url: "data/products.php",
        data:{kw:kw,pno:pno,pageSize:pageSize},
        success: function (pager) {
            var html = '';
            //遍历每个商品
            //第一个参数的下标i 第二个参数的对象
            $.each(pager.data, function (i, p) {//产品内容
                html += `
                <li>
                    <a href="product_detail.html?pid=${p.pid}""><img src="${p.pic}" alt=""/></a>
                    <p>${p.price}</p>
                    <h1><a href="">${p.pname}</a></h1>
                    <div>
                        <a href="${p.pid}" class="contrast"><i></i>对比</a>
                        <a href="${p.pid}" class="p-operate"><i></i>关注</a>
                        <a href="${p.pid}" class="addcart"><i></i>加入购物车</a>
                    </div>
                </li>  

           `;
            });
            $('#plist ul').html(html);
            //修改分页条中的内容
            var html = '';//分页条中内容
            if(pager.pno-1>0){
                html += `<li><a href="${pager.pno - 1}">${pager.pno - 1}</a></li> `;
            }
            html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li> `

            if(pager.pno+1<=pager.pageCount){
                html+=`<li><a href="${pager.pno+1}" >${pager.pno+1}</a></li>`;
            }
            $('.pager').html(html);

        },
        error: function () {
            alert("产品列表响应完成但有问题")
        }

    })
}
/**为分页条中每个超链接绑定事件监听**/
$('.pager').on('click','a',function(e){
    e.preventDefault();
    var pn = $(this).attr('href');//要显示的页号
    loadProductByPage(pn);     //异步加载商品数据
});
/*为每个添加到购物车“超链接绑定单击事件监听”**/
$('#plist').on('click','a.addcart',function(e){
    e.preventDefault();
    var pid = $(this).attr('href');
    //异步请求，实现添加到购物车
    $.ajax({
        type:'POST',
        url:'data/cart_prouduct_add.php',
        data:{uid:uid ,pid:pid},
        success:function(result){
            //处理购物车添加结果
            if(result.code===1){
                alert('商品成功添加到购物车！该商品已购买的数量:'+result.count);
            }else{
                alert('添加失败！错误信息:'+result.msg);
            }
        }
    })

})

/*去购物车 结算添加单击事件**/
// 注意：下面代码不能为异步请求页头/页尾的元素绑定监听函数！！
// 只能使用事件代理，委托DOM树上已有的父元素
// $("#my_jd").click(function(){
//     console.log(1231313);
// });

$('#header').on('click',"#my_jd",function(){
   //将用户的登录信息保存为Cookie,公用一个页面使用
   //  document.cookie = 'LoginUserId='+loginUid;
   //  document.cookie = 'LoginUserName='+loginUname;
    console.log(12313);
    location.href = 'shopcar.html';
})

})()




















