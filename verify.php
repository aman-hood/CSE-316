<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify OTP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(135deg, #d6e0ea, #87d7f7);
        }
        .otp-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            width: 350px;
            text-align: center;
        }
        .otp-container h2 {
            margin-bottom: 15px;
            color: #333;
        }
        .otp-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
            letter-spacing: 3px;
            font-weight: bold;
        }
        .otp-container input:focus {
            border-color: #007bff;
            outline: none;
        }
        .otp-container button {
            width: 100%;
            padding: 12px;
            background: #007bff;
            border: none;
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }
        .otp-container button:hover {
            background: #0056b3;
        }
        .resend-link {
            display: block;
            margin-top: 15px;
            color: #007bff;
            text-decoration: none;
            font-size: 14px;
        }
        .resend-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="otp-container">
        <h2>Verify OTP</h2>
        <p>Please enter the OTP sent to your email.</p>
        <form action="verify_otp.php" method="POST">
            <input type="text" name="otp" placeholder="Enter OTP" required maxlength="6">
            <button type="submit">Verify OTP</button>
        </form>
        <a href="#" class="resend-link">Resend OTP</a>
    </div>

</body>
</html>
