<?php
/**
*接收客户端提交的pageNum，向客户端输出该页中所有的产品信息，以JSON格式：
*/
header('Content-Type: application/json;charset=UTF-8');
require('00_init.php');
@$kw = $REQUEST['kw'];
//获取页数
@$pno = $_REQUEST['pno'];
if(!$pno){
	$pno = 1;//客户端未提交pageNum，默认值为1
}else { //客户端提交了pageNum，把字符串解析为整数
	$pno = intval($pno);
}
//获取一页中记录条数
@$pageSize=$_REQUEST['pageSize'];
if(!$pageSize){
    $pageSize=8;//默认显示每页为8条记录
}else{
    $pageSize = intval($pageSize);
}
//数据起始位置
$offset =($pno-1)*$pageSize;
//将要向客户端输出的分页数据
//创建sql语句
$sql = "SELECT * FROM k_product";
if($kw){
  $kws=explode(" ",$kw);//js:split
  for($i=0;$i<count($kws);$i++){
    $kws[$i]=" title like '%".$kws[$i]."%'";
  }
  $where=" where ".implode(" and ",$kws);//js:join
  $sql=$sql.$where;
}
$count=count(sql_execute($sql));
$sql=$sql." limit ".$offset." ,".$pageSize;//limit 0,9
$result=sql_execute($sql);
$pageCount=ceil($count/$pageSize);
$output = [
  "count"=>$count,  //总记录数
  "pageSize"=>$pageSize,  //页数大小
  "pageCount"=>$pageCount,//总页数
  "pno"=>$pno,  //当前页数
  "data"=>$result  //当前内容
];

echo json_encode($output);







