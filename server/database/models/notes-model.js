import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minLength: 1 },
    content: { type: String, required: true, trim: true, minLength: 1 },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);
export default Note;
