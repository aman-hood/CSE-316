<?php
session_start();
if (isset($_POST['otp'])) {
    $entered_otp = $_POST['otp'];
    if ($entered_otp == $_SESSION['otp']) {
        header("Location: main_content.html");
       
    } else {
        echo "Invalid OTP! Try again.";
    }
}
?>
