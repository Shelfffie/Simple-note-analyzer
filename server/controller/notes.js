import Note from "../database/models/notes-model.js";
import noteAnalysis from "../services/string_analyst.js";
import { headerAndReq } from "../utils/utils.js";

const createEmptyNote = async (req, res) => {
  try {
    let [title, content] = ["", ""];
    const note = new Note({ title, content });
    await note.save();
    headerAndReq(res, 201, { message: "Note is created!", note: note });
  } catch (error) {
    console.error(
      "An error occurred during creation in createEmprtyNote:",
      error
    );
    headerAndReq(res, 500, { error: "Server error" });
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
          headerAndReq(res, 400, { error: "Missing field." });
          return;
        }

        const note = await Note.findByIdAndUpdate(
          noteId,
          {
            $set: { title, content },
          },
          { returnDocument: "after", runValidators: true }
        );

        if (!note || note.length === 0) {
          headerAndReq(res, 404, { message: "No notes found" });
          return;
        }
        headerAndReq(res, 200, { note });
      } catch (error) {
        console.error(
          "An error occurred during creation in createNote:",
          error
        );
        headerAndReq(res, 500, { error: "Server error" });
      }
    });
  } catch (error) {
    console.error("An error occurred during creation in createNote:", error);
    headerAndReq(res, 500, { error: "Server error" });
  }
};

const getNoteByIdAndAnalyse = async (req, res) => {
  try {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const noteId = myUrl.pathname.split("/")[2];
    const details = myUrl.searchParams.get("analysis");
    const note = await Note.findById(noteId);

    if (!note) {
      headerAndReq(res, 404, { error: "There is no note with this Id" });
      return;
    }

    const noteObj = note.toObject();
    if (details === "true") {
      noteObj.analyzed = noteAnalysis(note);
    }

    headerAndReq(res, 200, { note: noteObj });
  } catch (error) {
    console.error("An error occurred during getting in getNoreById:", error);
    headerAndReq(res, 500, { error: "Server error" });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    if (!notes || notes.length === 0) {
      headerAndReq(res, 404, { message: "No notes found" });
      return;
    }

    headerAndReq(res, 200, notes);
  } catch (error) {
    console.error("An error occurred during getting in getNotes:", error);
    headerAndReq(res, 500, { error: "Server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.url.split("/")[2];
    const note = await Note.findById(noteId);

    if (!note) {
      headerAndReq(res, 404, { error: "There is no note with this Id" });
      return;
    }

    await Note.findByIdAndDelete(noteId);
    headerAndReq(res, 200, { message: "Successfully deleted!" });
  } catch (error) {
    console.error("An error occurred during deletion in getNotes:", error);
    headerAndReq(res, 500, { error: "Server error" });
  }
};

export {
  updateNote,
  createEmptyNote,
  getNoteByIdAndAnalyse,
  getAllNotes,
  deleteNote,
};
