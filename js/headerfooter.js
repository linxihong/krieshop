/**
 * Created by Administrator on 2017/11/16 0016.
 */
    //异步请求页头和页脚
    (()=>{
        $("#foot").load('footer.html');
        $("#header").load("header.html",()=>{
            //登录功能
            var $login=$("#listLogin"),
                $welcome=$("#listWelcome");
            //获取存取的uid 和uname
            var uname=sessionStorage.getItem("uname");
            var uid=sessionStorage.getItem("uid");
            console.log(uid);
            if(uid!=null){
                $(".utitle").html(uname);
                $welcome.show();
                $login.hide();
            }else{
                $welcome.hide();
                $login.show();
            }
            //登录按钮
            $("#login").click(function(){
                console.log(123456);
                location="login.html";
            })
            //注销按钮
            $("#reg").click(function(){
                console.log(1231);
                sessionStorage.clear();
                location.reload();
            });
          //搜索功能
            $('#search_input').on('click',function(){
                var kw = $('#txtSearch').val();
                if(kw.trim().length!=0){
                    var url = 'product_dailt.html?kw='+kw;
                    location.href = url;
                }
            });
            //回车搜索
            $('#txtSearch').on('keydown',function(){
               if(event.keyCode==13){
                   var kw = $('#txtSearch').val();
                   if(kw.trim().length!=0){
                       var url = 'product_dailt.html?kw='+kw;
                       location.href = url;
                   }
               }

            });

        });




    })();



