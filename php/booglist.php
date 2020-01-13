<?php
require_once "./config.php";
$title =$_GET['title'];
$operation = $_GET['operation'];
$key = $_GET['key'];
$sql = "SELECT * FROM `goodlist` WHERE title  LIKE '%%' AND name LIKE '%$key%'  ORDER by price $operation";

// echo $sql;
$sqlList = mysqli_query($conn,$sql);
$obj = array();
$obj["code"] = 1;
$list = array();
while($data = mysqli_fetch_array($sqlList)){
    $arr= array();
    $arr["id"]=$data["id"];
    $arr["title"]=$data["title"];
    $arr["img"]=$data["img"];
    $arr["imgs"]=$data["imgs"];
    $arr["name"]=$data["name"];
    $arr["price"]=$data["price"];
    $arr["size"]=$data["size"];
    $arr["number"]=$data["number"];
    $list[]=$arr;

}
$obj["list"] = $list;

echo json_encode($obj);