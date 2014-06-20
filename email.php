<?php
 
// THE EMAIL ADDRESS WHERE YOU WANT TO SEND
$email = 'juscheele@gmail.com';
// THE EMAIL SUBJECT
$subject = 'Neue Nachricht über regiomino.biz';

$yn = $_POST['yourname'];
$em = $_POST['email'];
$ta = $_POST['message'];

if ( $yn == '' ) { 
	die('yourname');
}
include_once('functions.php');
if ( !check_email_address($em) ) {
	die('email');
}
if ( $ta == '' ) {
	die('message');
}
$message = '
<html>
<head>
	<title>Message from Contact Form</title>
</head>
<body>
	<h2>Hello,</h2>
	<h2>'.$subject.'</h2>
	<p>Name: '.$yn.'</p>
	<p>Email: '.$em.'</p>
	<p>Message: </p>
	<p>'.$ta.'</p>
</body>
</html>
';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'To: '.$email. "\r\n";
$headers .= 'From: '.$yn.' <'.$em.'>' . "\r\n";
 
 
if ( @mail($yn, $subject, $message, $headers) ) {
	echo 'sent';
} else {
	echo 'name';
} 
?>