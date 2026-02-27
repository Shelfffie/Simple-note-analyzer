import Note from "../database/models/notes-model.js";
import noteAnalysis from "../services/string_analyst.js";

const createEmptyNote = async (req, res) => {
  try {
    let [title, content] = ["", ""];
    const note = new Note({ title, content });
    await note.save();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Note is created!" }));
  } catch (error) {
    console.error(
      "An error occurred during creation in createEmprtyNote:",
      error
    );
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.url.split("/")[2];

    req.setEncoding("utf8");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const { title, content } = data;

        if (!title && !content) {
          res.writeHead(400, { "Content-type": "application/json" });
          return res.end(JSON.stringify({ error: "Missing field." }));
        }

        const note = await Note.findByIdAndUpdate(
          noteId,
          {
            $set: { title, content },
          },
          { returnDocument: "after", runValidators: true }
        );

        if (!note || note.length === 0) {
          res.writeHead(404, { "Content-type": "application/json" });
          return res.end(JSON.stringify({ message: "No notes found" }));
        }

        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify({ note }));
      } catch (error) {
        console.error(
          "An error occurred during creation in createNote:",
          error
        );
        res.writeHead(500, { "Content-type": "application/json" });
        res.end(JSON.stringify({ error: "Server error" }));
      }
    });
  } catch (error) {
    console.error("An error occurred during creation in createNote:", error);
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

const getNoteByIdAndAnalyse = async (req, res) => {
  try {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const noteId = myUrl.pathname.split("/")[2];
    const details = myUrl.searchParams.get("analysis");
    const note = await Note.findById(noteId);

    if (!note) {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(
        JSON.stringify({ error: "There is no note with this Id" })
      );
    }

    const noteObj = note.toObject();
    if (details === "true") {
      noteObj.analyzed = noteAnalysis(note);
    }

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ note: noteObj }));
  } catch (error) {
    console.error("An error occurred during getting in getNoreById:", error);
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    if (!notes || notes.length === 0) {
      res.writeHead(404, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ message: "No notes found" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(notes));
  } catch (error) {
    console.error("An error occurred during getting in getNotes:", error);
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(JSON.stringify({ error: "Server error" }));
  }
};

export { updateNote, createEmptyNote, getNoteByIdAndAnalyse, getAllNotes };
