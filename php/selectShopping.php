<?php
require_once "./config.php";
$username=$_GET["username"];
$sql = "SELECT * FROM shopping WHERE username = '$username'";
$sqllist = mysqli_query($conn,$sql);

$obj=array();
$list=array();
if($sqllist){
    while($data = mysqli_fetch_array($sqllist)){
        $cnt=array();
        $cnt["img"]=$data["img"];
        $cnt["doogname"]=$data["doogname"];
        $cnt["color"]=$data["color"];
        $cnt["size"]=$data["size"];
        $cnt["price"]=$data["price"];
        $cnt["num"]=$data["num"];
        $cnt["goodid"]=$data["goodid"];
        $list[]=$cnt;
    }
    $obj["code"]=1;
    $obj["data"]=$list;
  
}else{
    $obj["code"]=0;
}
echo json_encode($obj);