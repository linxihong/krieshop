<?php
   header("Content-Type:application/json;charset=utf-8");
	#1、获取前端请求过来的数据
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$email=$_REQUEST["email"];
	@$phone=$_REQUEST["phone"];
	#2、连接到数据库
	$conn = mysqli_connect("127.0.0.1","root","","kire",3306);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	#3、拼sql语句
	$sql="insert into k_user values(null,'$uname','$upwd','$email','$phone')";
	#4、执行sql语句[
	$result=mysqli_query($conn,$sql);
	#5、根据执行结果给出响应提示
	if($result==true){
	echo '{"code":1,"msg":"注册成功"}';
	}else{
		echo '{"code":-1,"msg":"注册失败"}';
	}
?>