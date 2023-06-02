const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../src")));
app.use("/public", express.static(path.join(__dirname, "./public")));

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0075",
  database: "loginuser",
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결에 실패했습니다.", err);
  } else {
    console.log("MySQL 연결이 성공했습니다.");
  }
});

// 회원가입 라우트
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "회원가입에 실패했습니다." });
    } else {
      res.json({ message: "회원가입이 완료되었습니다." });
    }
  });
});

// 로그인 라우트
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "로그인에 실패했습니다." });
    } else {
      if (results.length > 0) {
        res.json({ message: "로그인 성공!" });
      } else {
        res
          .status(401)
          .json({ error: "유효하지 않은 사용자명 또는 비밀번호입니다." });
      }
    }
  });
});

// 앨범 앱 라우트
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db/db.json");
const db = low(adapter);

const TIMER = 1000;

app.get("/files", (request, response) => {
  const rootFiles = db.get("files").value();
  setTimeout(() => {
    response.json(rootFiles);
  }, TIMER);
});

app.get("/files/:nodeId", (request, response) => {
  const { nodeId } = request.params;
  const files = db
    .get("files")
    .filter({ parent: { id: nodeId } })
    .value();
  setTimeout(() => {
    response.json(files);
  }, TIMER);
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../src/start_page.html"));
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 시작되었습니다. 포트: ${PORT}`);

  // 각 라우트 연결 메시지 표시
  console.log("회원가입 라우트: POST /signup");
  console.log("로그인 라우트: POST /login");
  console.log("앨범 앱 라우트: GET /files, GET /files/:nodeId");
});
