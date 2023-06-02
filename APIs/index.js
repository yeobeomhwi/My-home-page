const express = require("express");
const cors = require('cors');
const path = require("path");

const app = express();
const database = require("./db");
const { db } = database;

const TIMER = 1000;

app.use(cors()); // CORS 미들웨어를 사용하여 Cross-Origin 요청 허용
app.use(express.static(path.join(__dirname, "../src"))); // 정적 파일을 서빙하기 위한 미들웨어 설정
app.use("/public", express.static(path.join(__dirname, "./public"))); // "/public" 경로에 대한 정적 파일 서빙

app.get("/files", (request, response) => {
  const rootFiles = db.get("files").root().value(); // 데이터베이스에서 루트 파일 목록 가져오기
  setTimeout(() => {
    response.json(rootFiles); // 루트 파일 목록을 JSON 형태로 응답
  }, TIMER);
});

const baseAssetPath = '/public/images';

app.get("/files/:nodeId", (request, response) => {
  const { nodeId } = request.params;
  const files = db.get("files").findChildren(nodeId).value(); // 특정 노드의 파일 목록 가져오기
  setTimeout(() => {
    response.json(files); // 특정 노드의 파일 목록을 JSON 형태로 응답
  }, TIMER);
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../src/start_page.html")); // 루트 경로로 요청이 들어오면 "start_page.html" 파일을 응답
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Album App listening at http://localhost:${PORT}`); // 지정한 포트에서 앱 실행
});
