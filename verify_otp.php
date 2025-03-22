<?php
session_start();
if (isset($_POST['otp'])) {
    $entered_otp = $_POST['otp'];
    if ($entered_otp == $_SESSION['otp']) {
        header("Location: landingPage.html");
       
    } else {
        echo "Invalid OTP! Try again.";
    }
}
?>
