<?php
session_start();

$correct_username = "b221210585@sakarya.edu.tr";
$correct_password = "b221210585";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["email"];
    $password = $_POST["password"];

    if (!empty($username) && !empty($password) && filter_var($username, FILTER_VALIDATE_EMAIL)) {
        if ($username == $correct_username && $password == $correct_password) {
            $_SESSION['loggedin'] = true; 
            echo "<!DOCTYPE html>
<html>
<head>
    <link rel='stylesheet' type='text/css' href='css/login-successful.css'>
</head>
<body>
    <p class='success-message'>Welcome Kadir!</p>
</body>
</html>";
            header("refresh:2;url=index.html"); //2 seconds is good enough
        } else {
            header("Location: login.html");
        }
    } else {
        header("Location: login.html");
    }
}
?>