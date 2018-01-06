/**
 * Created by Administrator on 2017/11/17 0017.
 */
/**
 * Created by Administrator on 2017/11/9 0009.
 */
//检测用户名
$("#uname").on("blur", function(){
    console.log(11111);
    var $this=$(this);
    if((/^\w{4,8}$/).test($(this).val())){
        $.ajax({
            url:"data/vail.php",
            data:{uname:$this.val()},
            type:"get",
            success:function(reslut){
                console.log(reslut);
                if(reslut.code==1){
                    $("#uTitle").html("用户名可以使用！").addClass("pass");
                }else{
                    $("#uTitle").html("用户名已经存在").addClass("error");
                }
            }
        })
    }else{
        $("#uTitle").html("用户名必须在4-8位之间").addClass("focus");
    }
})

//检测密码
$("#upwd").on("focus blur",function(){
    if(/^\w{6,12}$/.test($(this).val())){
        $("#pTitle").html("验证通过").addClass("pass");
    }else{
        $("#pTitle").html("密码必须6-12位").addClass("error");
    }
});
//检测重写密码
$("#repwd").on("focus blur",function(){
    var pwd = $("#upwd").val();
    if(pwd === $(this).val() && $(this).val()!==""){
        $("#reTitle").html("验证通过").addClass("pass");
    }else{
        $("#reTitle").html("两次输入密码不一致").addClass("error");
    }
});
//检测手机
$("#phone").on("focus blur",function(){
    if(/^1[0-9]{10}$/.test($(this).val())){
        $("#ph").html("手机号码正确").addClass("pass");
    }else {
        $("#ph").html("手机格式不正确").addClass("error");
    }
});
//检测邮箱
$("#email").on("focus blur",function(){
    var $this = $("#email");
    if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($this.val())){
        $("#eTitle").html("邮箱格式正确").addClass("pass");
    }else {
        $("#eTitle").html("邮箱格式不正确").addClass("error");
    }
});
//提交

$("#btn_reg").click(function (){
    // e.preventDefault();
    //  if($("#check").is(':checked')){
    var uname = $("#uname").val();
    var phone = $("#phone").val();
    var upwd = $("#upwd").val();
    var email = $("#email").val();
    $.ajax({
        type:"POST",
        url:"data/reguster.php",
        data:{uname:uname,upwd:upwd,phone:phone,email:email},
        success:function(data){
            console.log(data.code);
            if(data.code==1){
                alert("注册成功！3秒钟后跳转到登录页面");
                setTimeout(function(){
                    location.href="product_dailt.html";
                },3000);
            }else{
                alert("注册失败");
            }
        }
    });
    // }else{
    //     alert("请完整填写信息并同意用户协议");
    // }
});


