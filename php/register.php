<?php
require_once "./config.php";

$username = $_GET['username'];
$password = $_GET['password'];

$sql = "SELECT *FROM userinfo WHERE uname = '$username'";
$userlt = mysqli_query($conn,$sql);//取满足条件的集合
$data = mysqli_fetch_array($userlt );//取值

$obj = [];
if($data){
    // var_dump ($password);
    // var_dump ($data["upassword"]);
    if($password==$data["upassword"]){
        $obj ['code']=1;
        $obj ['msg']='登录成功!';
        $obj ['data'] = true;
    }else{
        $obj ['code']=0;
        $obj ['msg']='用户名或密码错误!';
        $obj ['data'] = false;
    }

}else{
    $obj['code'] =0;
    $obj['msg']='用户名或密码错误!**';
    $obj ['data'] = false;
}

echo json_encode($obj);