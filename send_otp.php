<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // PHPMailer 

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $otp = rand(100000, 999999); // 6-digit OTP
    $_SESSION['otp'] = $otp; //  
    $_SESSION['email'] = $email;

    $mail = new PHPMailer(true);
    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'maxrushto77@gmail.com'; // 
        $mail->Password = 'pffy lysx kqke czad'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Email Settings
        $mail->setFrom('your-email@gmail.com', 'Your Name');
        $mail->addAddress($email);
        $mail->Subject = 'Your OTP Code';
        $mail->Body = "Your OTP code is: $otp";

        // Send Email
        $mail->send();
        header("Location: verify.php");
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }
}
?>
