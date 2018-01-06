<?php
header("Content-Type:application/json;charset=UTF-8");
@$rcvName = $_REQUEST['rcvName'] or die ('{"code":2,"msg":"rcvName required"}');
@$addr = $_REQUEST['addr'] or die ('{"code":3,"msg":"addr required"}');
@$price = $_REQUEST['price'] or die ('{"code":4,"msg":"price required"}');
@$payment = $_REQUEST['payment'] or die ('{"code":5,"msg":"payment required"}');
@$userId = $_REQUEST['userId'] or die ('{"code":6,"msg":"userId required"}');
$orderTime = time()*1000;
$status = 1; //刚下的订单，默认状态为配货中

require('01_init.php');
//sql1:向k_order表中插入一行记录，得到oid
$sql = "INSERT INTO k_order VALUES(NULL,'$rcvName','$addr','$price','$payment','$orderTime','$status','$userId')";
$result = mysqli_query($conn,$sql);
$orderId = mysqli_insert_id($conn);

//sql2:读取当前用户购物车中，获取所有商品的编号和购买数量
$sql = "SELECT productId,count FROM k_cart_detail WHERE cartId=(SELECT cid FROM k_cart WHERE userId=$userId)";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);

//sql :(循坏)针对每个购物车项执行INSERT ,插入到 k_order_datail
foreach($list as $p){
 $sql = "INSERT INTO k_order_detail VALUES(NULL,'$orderId','$p[productId]','$p[count]')";
 mysqli_query($conn,$sql);
}
//sql :删除当前用户购物车中的项目
$sql = "DELETE FROM k_cart_detail WHERE cartId=(SELECT cid FROM k_cart WHERE userId=$userId)";
mysqli_query($conn,$sql);

$output['code']=1;
$output['orderId']=$orderId;
echo json_encode($output);






?>