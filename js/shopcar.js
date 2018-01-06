/**功能点1：读取上一页面共享的Cookie数据**/
// var arr = document.cookie.split('; '); //此处用;+空格拆分
// var cookieData = {};
// for(var i=0; i<arr.length; i++){
//     var kv = arr[i];    //"k=v"形式的键值对
//     var pair = kv.split('='); //使用=拆分每个键值对
//     cookieData[pair[0]] = pair[1];
// }
// var loginUid = cookieData['LoginUserId'];
// var loginUname = cookieData['LoginUserName'];
// console.log(loginUname);
// console.log(loginUid);

/****功能1：检查用户是否已经登录，若没有，就跳转到登录页面***/
  // if(!sessionStorage['LoginName']){
  //     //未登录就条转到登录页
  //     location.href='product_dailt.html'
  // }
// console.log(sessionStorage['LoginName']);
// /**功能点2：异步请求页头页页尾**/
// $('#header').load('header.html',function(){
//     //load的回调函数——异步请求成功完成后才执行
//     $("#listWelcome").show();
//     $("#listLogin").hide();
//     $(".utitle").html(sessionStorage['LoginName']);
// });
// $('#foot').load('footer.html');
/*
 //修改失败！！
 $('#welcome').html("欢迎回来："+loginUname);
 alert('JS执行完成:'+$('#welcome').length);
 */
var uid = sessionStorage.getItem("uid");
 $.ajax({
    type: 'GET',
    url: 'data/cart_detail.php',
    data: {uid:uid},
    success: function(list){
        console.log(list);
        //遍历购物车中的每个商品，生成TR和TD
        var html = '';
        var total=0;
        $.each(list, function(i,p){
            html += `
      <tr>
          <td>
              <input type="checkbox"/>
              <input type="hidden" value="${p.did}" />
              <div><img src="${p.pic}"></div>
          </td>
          <td><a href="">${p.pname}</a></td>
          <td>${p.price}</td>
          <td>
              <button>-</button><input type="text" value="${p.count}"/><button>+</button>
          </td>
          <td><span>${p.price*p.count}</span></td>
          <td><a href="${p.did}">删除</a></td>
      </tr>  
      `;
            total += parseInt(p.price*p.count);
            console.log(total);
        });
        $('#cart tbody').html(html);
        $("#total").html( total)
    }
});
/**点击去“去结算”按钮，跳转到生成订单页面**/
$('#btn_buy').click(function(){
   // console.log(1111);
    location.href = "order.html";
});
