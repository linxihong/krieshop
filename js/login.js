/**
 * Created by Administrator on 2017/11/17 0017.
 */
/**
 * Created by Administrator on 2017/11/7 0007.
 */
$(".login").click(function(){
    var uname = $("#uname").val();
    var upwd = $("#upwd").val();

    if(uname=="" || uname==undefined){
        $(".utext").html("用户名不能为空")
        return false;
    }
    if(upwd==""|| upwd==undefined){
        $(".ptext").html("密码为空")
        return false;
    }
    $.ajax({
        url:"data/login.php",
        data:{uname:uname,upwd:upwd},
        type:"POST",
        success:function(data){
            console.log(data);
            if(data.code>0){
                //保存用户名和编号保存到sessionStorage中
                sessionStorage.setItem("uname",uname);
                sessionStorage.setItem("uid",data.uid);
                console.log(sessionStorage.setItem("uid",data.uid))
                location.href="index.html";
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("网络故障，请查看网络");
        }
    })
})