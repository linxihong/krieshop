<?php
header("Content-Type:application/json");
require('00_init.php');

@$pid=$_REQUEST["pid"] or die ('{"code":2,"msg":"pid required"}');

    //关联数组
    $output=[
      'pid'=>$pid,
       'pic'=>0,


    ];
    //sql1:获取所有商品的介绍和价格
    $sql = "SELECT * FROM k_product WHERE pid=$pid";
     $output["pic"]=sql_execute($sql);
      //sql 2 获取所有的图片
    $sql = "SELECT * FROM k_pic WHERE k_id=$pid";
     $output['pics']=sql_execute($sql);
    // $result = mysqli_query($conn,$sql);
    // //抓取数据
    // $row = mysqli_fetch_row($result);

    // $output['pic']=$row;

   
    
  

     // $result = mysqli_query($conn,$sql);
     // $row = mysqli_fetch_row($result);
     // $output['title'] = $row;

    echo json_encode($output);





?>