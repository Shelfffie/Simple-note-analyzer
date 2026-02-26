import axios from "axios";
import { useState, useEffect } from "react";
import { Note } from "../types/types";
import { useNavigate } from "react-router-dom";

function GetNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3010/note");
        if (response.status === 200) {
          setNotes(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(
            "Server error:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.log("Unknown error:", error);
        }
      }
    };

    getNotes();
  }, []);

  return (
    <>
      <main>
        <ul className="note-list">
          {notes.map((note) => (
            <li
              key={note._id}
              className="note"
              onClick={() => navigate(`/note/${note?._id}`)}
            >
              {note.title.length === 0 ? (
                <h2 className="title no-content">No tittle yet...</h2>
              ) : (
                <h2 className="title">{note.title}</h2>
              )}
              {note.content.length === 0 ? (
                <p className="no-content">No text yet...</p>
              ) : (
                <p className="content">{note.content}</p>
              )}
              <p className="update">{note.updated_at}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default GetNotes;
