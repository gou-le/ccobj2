<?php
require_once "./config.php";
$id=$_GET['id'];
$sql = "SELECT * FROM goodlist WHERE id=$id";
$sqlList = mysqli_query($conn,$sql);
$obj = array();

if($sqlList){
    $obj['code']=1;
    $data= mysqli_fetch_array($sqlList);
    $arr= array();
    $arr["id"]=$data["id"];
    $arr["title"]=$data["title"];
    $arr["img"]=$data["img"];
    $arr["imgs"]=$data["imgs"];
    $arr["name"]=$data["name"];
    $arr["price"]=$data["price"];
    $arr["size"]=$data["size"];
    $arr["number"]=$data["number"];
    $arr["color"]=$data["color"];
    $arr["num"]=$data["num"];
    $arr["textcolor"]=$data["textcolor"];
    $obj["data"]=$arr;
}
echo json_encode($obj);