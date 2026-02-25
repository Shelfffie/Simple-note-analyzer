import http from "http";
import { createNote, getNotes, getNoteById } from "./controller/notes.js";
import connectDB from "./database/connect.js";

const PORT = 3000;

connectDB();

const server = http.createServer((req, res) => {
  if (req.url === "/note") {
    if (req.method === "POST") {
      createNote(req, res);
    } else if (req.method === "GET") {
      getNotes(req, res);
    }
  } else if (req.method === "GET" && req.url.startsWith("/note/")) {
    getNoteById(req, res);
  }
});

server.listen(PORT, () => {
  console.log("Server is running!");
});
