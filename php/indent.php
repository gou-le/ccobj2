<?php
require_once "./config.php";

$img=$_GET["img"];
$goodname=$_GET["goodname"];
$color=$_GET["color"];
$size=$_GET["size"];
$num=$_GET["num"];
$price=$_GET["price"];
$username=$_GET["username"];
$goodid=$_GET["goodid"];
$sums=$_GET["sums"];
$pricesum=$_GET["pricesum"];

$sql="INSERT INTO indent (img,goodname,color,size,num,price,username,goodid,sums,pricesum)VALUES('$img','$goodname','$color','$size','$num','$price','$username','$goodid','$sums','$pricesum')";
$sqplist= mysqli_query($conn,$sql);
  
$rows=mysqli_affected_rows($conn);
$onj=array();
if($rows){
    // echo 1;
    $obj["code"]='1';
    $obj["msg"]="添加成功";
}else{
    // echo 0;
    $obj["code"]='0';
    $obj["msg"]="添加失败";
}
echo json_encode($obj);