<?php
header("Content-Type:application/json;charset=UTF-8");
@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');
require('01_init.php');
//sql1:根据用户编号查询出所有订单

$sql = "SELECT * FROM k_order WHERE userId = $uid";
//执行语句
$result = mysqli_query($conn,$sql);
//抓取所有数据
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
//打出所有数据
//var_dump($list);
//缺少商品信息
//难点
foreach($list as $k=>$order){
  $oid = $order['oid'];//订单的编号
  //sql2：根据订单编号查询出所有的商品
  $sql = "SELECT * FROM k_product WHERE pid IN (SELECT productId FROM k_order_detail WHERE orderId=$oid)";
  $result = mysqli_query($conn,$sql);
   $list[$k]['productList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

}
//打出所有数据
//var_dump($list);
echo json_encode($list);
?>