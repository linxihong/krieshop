<?php
/***
*接收客户端提交用户编号，返回该用户的抽奖统计信息，
*形如：{"uid":10, "total":21, "used": 3}
*/
header('Content-Type: application/json');
@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}'); ;

require('01_init.php');
//关联数组

$output = [
    'uid'=>$uid,
    'total'=>0,
    'used'=>0
];
//sql1:计算指定用户的订单总额
$sql = "SELECT SUM(price) FROM k_order WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
//抓取数据
//字符串转换整数intval
$row = mysqli_fetch_row($result);
//$output['total']= intval(mysqli_fetch_row($result)/1000);
//获取一行
$sum = $row[0];
$output['total'] = intval( $sum/1000 );

//SQL2：计算指定用户已经抽奖的次数
$sql = "SELECT COUNT(*) FROM k_lottery WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$num = $row[0];
$output['used'] = intval( $num );
echo json_encode($output);


?>