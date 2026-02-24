import mongoose from "mongoose";
import Note from "../database/models/notes-model.js";

const createNote = (req, res) => {
  try {
    req.setEncoding("utf8");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const data = JSON.parse(body);
      const { title, content } = data;

      if (!title || !content) {
        res.writeHead(400, { "Content-type": "application/json" });
        return res.end(JSON.stringify({ error: "Missing field." }));
      }

      const note = new Note({ title, content });
      await note.save();
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ note }));
    });
  } catch (error) {
    console.error("An error occurred during creation:", error);
    res.wrireHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

const getNotes = async (req, res) => {
  try {
    req.setEncoding("utf8");

    const notes = await Note.find({});
    if (!notes || notes.length === 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "No notes found" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(notes));
  } catch (error) {
    console.error("An error occurred during getting:", error);
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

export default createNote;
