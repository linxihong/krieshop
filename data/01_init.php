<?php
 $host='localhost';
 $user ='root';
 $password = '';
 $database='kire';
 $port =3306;
 $charset = 'utf8';
 $conn=mysqli_connect($host,$user,$password,$database,$port,$charset);

 $sql ="SET NAMES $charset";
 mysqli_query($conn, $sql);

?>