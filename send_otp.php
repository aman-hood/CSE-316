<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // PHPMailer include

include 'db_config.php'; // Database connection include

if (isset($_POST['email'])) {
    $email = $_POST['email'];

    // Check if user exists in database
    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // User exists, proceed with OTP
        $otp = rand(100000, 999999); // Generate 6-digit OTP
        $_SESSION['otp'] = $otp;
        $_SESSION['email'] = $email;

        $mail = new PHPMailer(true);
        try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'maxrushto77@gmail.com'; // Your email
            $mail->Password = 'pffy lysx kqke czad'; // Use App Password
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
            exit();
        } catch (Exception $e) {
            echo "<script>alert('Error sending OTP: {$mail->ErrorInfo}');</script>";
        }
    } else {
        // User does not exist, redirect to signup
        echo "<script>
                alert('No account found! Please sign up.');
                window.location.href = 'signup.php';
              </script>";
    }
    $stmt->close();
    $conn->close();
}
?>
