import "dotenv/config";
import http from "http";
import {
  updateNote,
  createEmptyNote,
  getNoteByIdAndAnalyse,
  getAllNotes,
  deleteNote,
} from "./controller/notes.js";
import connectDB from "./database/connect.js";

const PORT = process.env.PORT;

connectDB();

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
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
      case "DELETE":
        deleteNote(req, res);
        break;
    }
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running!");
});
