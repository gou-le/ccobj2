<?php
header('Content-Type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$host = 'localhost:3306';
$username = $passwor = 'root';
$dbname = 'vmall';
$conn = mysqli_connect($host,$username,$passwor,$dbname );
if(!$conn){
    die('链接失败!');
}

// $conn = mysqli_connect("b-jlzrhge2mvfzix.bch.rds.gz.baidubce.com:3306", "b_jlzrhge2mvfzix", "954534408", "b_jlzrhge2mvfzix");
if (!$conn) {
    die('链接失败!');
}