<?php
require_once "./config.php";
$username = $_GET['username'];
// $username = 'aaa';
$password = $_GET['password'];


$sql = "SELECT * FROM userinfo WHERE uname = '$username'";//查询结果
$result = mysqli_query($conn, $sql);//查询集合
// echo json_encode($result );

$data = mysqli_fetch_array($result);//去集合里的值
// echo $data;


$obj = [];
if(!$data){//$data是空值就可以插入
    $sql = "INSERT INTO userinfo(uname,upassword) VALUES('$username','$password')";
    mysqli_query($conn,$sql);
    $rows = mysqli_affected_rows($conn);
    if($rows>0){
        $obj ['code']=1;
        $obj ['msg']='注册成功!';
        $obj ['data'] = true;
    }

}else{
    $obj ['code']=0;
    $obj ['msg']='注册失败!';
    $obj ['data'] = false;
}
echo json_encode($obj); 