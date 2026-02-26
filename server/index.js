import http from "http";
import {
  updateNote,
  createEmptyNote,
  getNoteByIdAndAnalyse,
  getAllNotes,
} from "./controller/notes.js";
import connectDB from "./database/connect.js";

const PORT = 3010;

connectDB();

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (req.url === "/note") {
    switch (req.method) {
      case "POST":
        createEmptyNote(req, res);
        break;
      case "GET":
        getAllNotes(req, res);
        break;
    }
  } else if (req.url.startsWith("/note/")) {
    switch (req.method) {
      case "GET":
        getNoteByIdAndAnalyse(req, res);
        break;
      case "PUT":
        updateNote(req, res);
        break;
    }
  }
});

server.listen(PORT, () => {
  console.log("Server is running!");
});
