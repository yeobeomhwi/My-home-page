<?php
$username = $_POST['username'];
$password = $_POST['password'];
$password_confirm = $_POST['password_confirm'];
$wu = 0; // 사용자 이름 중복 체크 변수
$wp = 0; // 비밀번호 일치 체크 변수

if (!is_null($username)) {
    $jb_conn = mysqli_connect('202.31.247.142', 'yeller', 'wjsansrk', 'yeller');
    $jb_sql = "SELECT username FROM member WHERE username = '$username';";
    $jb_result = mysqli_query($jb_conn, $jb_sql);
    
    if (mysqli_num_rows($jb_result) > 0) {
        $wu = 1; // 사용자 이름이 이미 존재함
    } elseif ($password != $password_confirm) {
        $wp = 1; // 비밀번호가 일치하지 않음
    } else {
        $encrypted_password = password_hash($password, PASSWORD_DEFAULT);
        $jb_sql_add_user = "INSERT INTO member (username, password) VALUES ('$username', '$encrypted_password');";
        mysqli_query($jb_conn, $jb_sql_add_user);
        mysqli_close($jb_conn);
        header('Location: register-ok.php'); // 회원 가입이 성공적으로 이루어지면 register-ok.php 페이지로 이동
        exit;
    }
}
?>