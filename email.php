<?php

require("class.phpmailer.php");

//sumbission data
$ipaddress = $_SERVER['REMOTE_ADDR'];
$date = date('d/m/Y');
$time = date('H:i:s');

//form data
$name = $_POST['yourname'];	
$email = $_POST['email'];
$message = $_POST['message'];

$mail = new PHPMailer();

$mail->IsSMTP();                                 		 // send via SMTP
$mail->Host     = "smtp.mandrillapp.com"; 					 // SMTP server
$mail->SMTPAuth = true;    								 // turn on SMTP authentication
$mail->Port     = 587;  

$mail->Username = "support@regiomino.de"; 			     // SMTP username
$mail->Password = "5j6M9NajRE56Jqb2C-45eQ";							 // SMTP password



$mail->From     = "support@regiomino.de";				 // SMTP username
$mail->AddAddress("support@regiomino.de");
$mail->AddAddress("julian.scheele@regiomino.de");// Your Adress
$mail->Subject  =  "regiomino.biz Kontaktformularanfrage!";
$mail->IsHTML(true);  
$mail->CharSet = 'UTF-8';
$mail->Body     =  "<p><strong>Name: </strong> {$name} </p>
					  <p><strong>Email Adresse: </strong> {$email} </p>
					  <p><strong>Nachricht: </strong> {$message} </p>
					  <p>Diese Nachricht wurde gesendet von: {$ipaddress} on {$date} at {$time}</p>";

if(!$mail->Send())
{
   echo "Mail Not Sent ";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "Mail Sent";

?>