<?php
 /**
 *向客户端输出所有的产品信息，以json格式
 * [{},{},{},....]
 **/
 header('Content-Type:application/json;charset=UTF-8');
 require('01_init.php');
 $sql = "SELECT * FROM k_product";
 $result = mysqli_query($conn,$sql);
 //抓取所有关联数组
 $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
 echo json_encode($row);

?>