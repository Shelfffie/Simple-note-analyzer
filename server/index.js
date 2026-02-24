import http from "http";
import createNote from "./controller/notes.js";
import connectDB from "./database/connect.js";

const PORT = 3500;

connectDB();

const server = http.createServer((req, res) => {
  if (req.url === "/note") {
    if (req.method === "POST") {
      createNote(req, res);
    }
  }
});

server.listen(PORT, () => {
  console.log("Server is running!");
});
