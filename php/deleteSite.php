<?php
require_once "./config.php";
$site=$_GET["site"];
$sql="DELETE  FROM sites WHERE siteg = '$site'";
$sqlLsit = mysqli_query($conn,$sql);
$rwos= mysqli_affected_rows($conn);
$obj= array();
if($rwos){
    $obj["code"]=1;
    $obj["msg"]="删除成功";
}else{
    $obj["code"]=0;
    $obj["msg"]="删除失败";
}
echo json_encode($obj);