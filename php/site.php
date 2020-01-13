<?php
require_once "./config.php";
$username=$_GET["username"];
$addressee=$_GET["addressee"];
$province=$_GET["province"];
$area=$_GET["area"];
$street=$_GET["street"];
$phone=$_GET["phone"];

$sql = "INSERT INTO sites (username,addressee,province,area,street,phone)VALUES('$username','$addressee','$province','$area','$street','$phone')";
$sqlLsit=mysqli_query($conn,$sql);
$rows=mysqli_affected_rows($conn);
$onj=array();
if($rows>0){
    $obj["code"]='1';
    $obj["msg"]="添加成功";
}else{
    // echo 0;
    $obj["code"]='0';
    $obj["msg"]="添加失败";
}
echo json_encode($obj);