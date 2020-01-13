<?php
require_once "./config.php";
$username=$_GET["username"];
$sql="DELETE  FROM indent WHERE username = '$username'";
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