<?php
require_once "./config.php";

$username=$_GET["username"];
$sql="SELECT * FROM sites WHERE username='$username'";
$sqlLsit=mysqli_query($conn,$sql);
$obj=array();
$list=array();

if($sqlLsit){
    while($data=mysqli_fetch_array($sqlLsit)){
        $cnt=array();
        $cnt["siteg"]=$data["siteg"];
        $list[]=$cnt;
    }
    $obj["code"]=1;
    $obj["data"]=$list;
}else{
    $obj["code"]=0;
}
echo json_encode($obj);