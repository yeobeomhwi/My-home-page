<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // 아이디와 비밀번호를 확인하는 로직을 구현해야 합니다.
    // 예를 들어, 데이터베이스에서 사용자 정보를 조회하여 인증을 수행합니다.
    // 이 예제에서는 간단하게 아이디와 비밀번호가 "admin"일 때만 인증을 성공하도록 합니다.
    
    if ($username === "admin" && $password === "admin") {
        echo "로그인 성공!";
    } else {
        echo "아이디 또는 비밀번호가 잘못되었습니다.";
    }
}
?>
