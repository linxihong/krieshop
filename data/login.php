<?php
session_start();
header("Content-Type:application/json;charset=utf-8");
require_once("01_init.php");
//接收前端数据，没有就返回响应错误消息
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"] ;
$sql="select * from k_user where uname='$uname' and upwd='$upwd'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row==null){
	echo '{"code":-1,"msg":"用户名或密码有误"}';
}else{
	echo '{"code":1,"msg":"登录成功","uid":'.$row["uid"].'}';
}
?>