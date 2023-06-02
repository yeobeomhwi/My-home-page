<?php
$username = $_POST['username'];
$password = $_POST['password'];
$password_confirm = $_POST['password_confirm'];
$wu = 0; // 사용자 이름 중복 체크 변수
$wp = 0; // 비밀번호 일치 체크 변수

if (!is_null($username)) {
    $jb_conn = mysqli_connect('localhost', 'root', 'wjsansrk', 'yeller');
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

<!doctype html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <title>회원 가입</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 14px;
        }

        input,
        button {
            font-family: inherit;
            font-size: inherit;
        }
    </style>
</head>

<body>
    <h1>회원 가입</h1>
    <form action="register.php" method="POST">
        <p><input type="text" name="username" placeholder="사용자 이름" required></p>
        <p><input type="password" name="password" placeholder="비밀번호" required></p>
        <p><input type="password" name="password_confirm" placeholder="비밀번호 확인" required></p>
        <p><input type="submit" value="회원 가입"></p>
        <?php
        if ($wu == 1) {
            echo "<p>사용자 이름이 중복되었습니다.</p>";
        }
        if ($wp == 1) {
            echo "<p>비밀번호가 일치하지 않습니다.</p>";
        }
        ?>
    </form>
</body>

</html>