<?php
header("Content-Type:application/json;charset=utf-8");
	require_once("01_init.php");
	@$uname = $_REQUEST["uname"];
	$sql = "select uname from k_user where uname='$uname'";
	$result =  mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	if($row==null){
      echo '{"code":1,"msg":"用户名可以使用!"}';
    }else{
      echo '{"code":-1,"msg":"用户名已存在"}';
    }

?>