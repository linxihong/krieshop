<?php
/**
根据客户端提交的用户编号，统计出该用户过去12个月每个月消费的数据
以json形式 --- 使用伪造数据
*/

header('Content-Type:application/json;charset=UTF-8');
@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');
//此处使用的假数据
$output = [
   ['label'=>'1月','value'=>8500],
   ['label'=>'2月','value'=>6500],
   ['label'=>'3月','value'=>4000],
   ['label'=>'4月','value'=>1500],
   ['label'=>'5月','value'=>5500],
   ['label'=>'6月','value'=>2500],
   ['label'=>'7月','value'=>3500],
   ['label'=>'8月','value'=>5800],
   ['label'=>'9月','value'=>5500],
   ['label'=>'10月','value'=>4500],
   ['label'=>'11月','value'=>0],
   ['label'=>'12月','value'=>3000],
];
echo json_encode($output);

?>