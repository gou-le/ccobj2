<?php
require_once "./config.php";
$username=$_GET["username"];
$sql="SELECT * FROM `indent`WHERE username='$username'";

$sqlLsit=mysqli_query($conn,$sql);
$obj=array();
$list=array();
if($sqlLsit){
    while($data=mysqli_fetch_array($sqlLsit)){
        $cnt=array();
        $cnt["img"]=$data["img"];
        $cnt["goodname"]=$data["goodname"];
        $cnt["color"]=$data["color"];
        $cnt["size"]=$data["size"];
        $cnt["num"]=$data["num"];
        $cnt["price"]=$data["price"];
        $cnt["goodid"]=$data["goodid"];
        $cnt["sums"]=$data["sums"];
        $cnt["pricesum"]=$data["pricesum"];
        $list[]=$cnt;
    }
    $obj["code"]=1;
    $obj["data"]=$list;
}else{
    $obj["code"]=0;
}
echo json_encode($obj);