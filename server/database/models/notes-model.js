import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    content: { type: String, trim: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);
export default Note;
