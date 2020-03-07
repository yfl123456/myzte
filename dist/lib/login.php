<?php
/*
****************************************************

	method: get

	   url: login.php

	  参数: act = add——注册用户
				  login——登陆
			user = 用户名
			pass = 密码
		
	return:	{err: 0/1, msg: 文字描述信息}
			 err:
				  0	 成功——具体参考msg
				  1	 失败——具体参考msg

****************************************************
*/

// 设置响应头，防止乱码
header("Content-type:text/html;charset=utf8");

error_reporting(0);//关闭错误报告

$link = mysqli_connect('localhost','root','root', 'text2');//连接数据库

mysqli_set_charset( $link, "utf8" );//设置编码

if (mysqli_connect_error($link)){//连接数据库失败
    die("连接失败：".mysqli_connect_error());
}

$act = $_GET['act'];//登录或注册字段

$user = strtolower($_GET['user']);//获取输入的账号,转成小写

$pass = $_GET['pass'];//获取输入的密码

switch($act){

	case 'login'://登录
		$sql = "SELECT COUNT(*) FROM `login` WHERE `name`='{$user}' AND `password`='{$pass}'";
		$res = mysqli_query($link, $sql);
		
		$row = mysqli_fetch_array($res);
		
		if((int)$row[0]>0){
			echo '{"err":"0","msg":"登陆成功"}';
			exit();
			header('location: ./cart.html');
		}else{
			echo '{"err":"1","msg":"用户名或密码有误"}';
			exit();
		}
		break;
}
?>