<?php
/**
*接收客户端提交的pageNum，向客户端输出该页中所有的产品信息，以JSON格式：
*/
header('Content-Type: application/json;charset=UTF-8');

@$pageNum = $_REQUEST['pageNum'];
if($pageNum===null){ //客户端未提交pageNum，默认值为1
	$pageNum = 1;
}else { //客户端提交了pageNum，把字符串解析为整数
	$pageNum = intval($pageNum);
}

//将要向客户端输出的分页数据
$output = [
	'recordCount' => 0,//满足条件的记录的总数
	'pageSize' => 8,   //页面大小，每页最多显示的记录数
	'pageCount' => 0,   //总的页数
	'pageNum' => $pageNum, //当前显示的页号
	'data'=>null            //当前页中的数据
];
require('01_init.php');

//SQL1: 查询总的记录数量
$sql = "SELECT COUNT(*) FROM k_product";
$result = mysqli_query($conn, $sql);
//COUNT(*)结果集中有一行一列的数据
$output['recordCount'] = intval( mysqli_fetch_row($result)[0] );
//计算出总页数
$output['pageCount'] = ceil( $output['recordCount'] / $output['pageSize'] );

//SQL 2:查询指定页中的数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];//一次最多读取的记录数量
$sql = "SELECT * FROM k_product LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
//抓取所有关联数组
$output['data'] = mysqli_fetch_all($result,1);
echo json_encode($output);







