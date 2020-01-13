<?php
require_once "./config.php";
// $id=$_GET["id"];
$img=$_GET["img"];
$doogname=$_GET["doogname"];
$color=$_GET["color"];
$size=$_GET["size"];
$num=$_GET["num"];
$price=$_GET["price"];
$username=$_GET["username"];
$goodid=$_GET["goodid"];

$search = "SELECT *FROM shopping WHERE goodid='$goodid' AND username='$username'";
$res = mysqli_query($conn,$search);
$cnt =mysqli_affected_rows($conn);
if($cnt>0){
    $sql="UPDATE shopping set num=num+$num WHERE goodid='$goodid' and username='$username'";
    
}else{
    $sql="INSERT INTO shopping (img,doogname,color,size,num,price,username,goodid)VALUES('$img','$doogname','$color','$size','$num','$price','$username','$goodid')";
    
}



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