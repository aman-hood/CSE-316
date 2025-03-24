<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $generated_password = $_POST['generated_password'];
    $created_password = $_POST['created_password'];
    $confirm_password = $_POST['confirm_password'];

    if (!empty($email) && !empty($generated_password) && !empty($created_password) && !empty($confirm_password)) {
        // Check if email already exists
        $check_sql = "SELECT id FROM users WHERE email = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows > 0) {
            echo "<script>alert('This email is already registered! Please login.'); window.location.href='login.php';</script>";
            exit();
        }
        $check_stmt->close();

        if ($created_password === $confirm_password) {
            // Hash the password
            $hashed_password = password_hash($created_password, PASSWORD_DEFAULT);

            // Insert user into database
            $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $email, $hashed_password);

            if ($stmt->execute()) {
                echo "<script>
                        alert('Sign up successful! Redirecting to login...');
                        window.location.href = 'login.php';
                      </script>";
                exit();
            } else {
                echo "<script>alert('Error: Could not register. Try again!');</script>";
            }
            $stmt->close();
        } else {
            echo "<script>alert('Passwords do not match!');</script>";
        }
    } else {
        echo "<script>alert('Please fill all fields correctly!');</script>";
    }
    $conn->close();
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="styles.css"> <!-- External CSS -->
    <style>
        /* General Styles */
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
        .signup-container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            width: 400px;
            text-align: center;
        }
        .signup-container h2 {
            margin-bottom: 15px;
            color: #333;
        }
        .signup-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .signup-container input:focus {
            border-color: #007bff;
            outline: none;
        }
        .signup-container button {
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
        .signup-container button:hover {
            background: #0056b3;
        }
        .redirect-link {
            display: block;
            margin-top: 15px;
            color: #007bff;
            text-decoration: none;
            font-size: 14px;
        }
        .redirect-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="signup-container">
        <h2>Sign Up</h2>
        <form action="signup.php" method="POST" onsubmit="return validatePasswords()">
            <input type="email" name="email" placeholder="Enter your email" required>
            
            <!-- Auto-generated password (User can change it) -->
            <input type="text" name="generated_password" id="generated_password" placeholder="Generated Password" readonly>
            <button type="button" onclick="generatePassword()">Generate Password</button>

            <input type="password" name="created_password" id="created_password" placeholder="Create Password" required>
            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required>
            
            <button type="submit">Sign Up</button>
        </form>
        <a href="login.php" class="redirect-link">Already have an account? Login</a>
    </div>

    <script>
        function generatePassword() {
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$_";
            let password = "";
            for (let i = 0; i < 10; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            document.getElementById("generated_password").value = password;
        }

        function validatePasswords() {
            let pass1 = document.getElementById("created_password").value;
            let pass2 = document.getElementById("confirm_password").value;

            if (pass1 !== pass2) {
                alert("Passwords do not match!");
                return false;
            }
            return true;
        }
    </script>

</body>
</html>
