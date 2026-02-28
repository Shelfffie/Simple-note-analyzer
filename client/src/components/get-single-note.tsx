import axios from "axios";
import { useState, useEffect } from "react";
import { Note } from "../types/types";
import { useDebounce } from "../hooks/use-debounce";
import { useParams } from "react-router-dom";
import { Analysis } from "./analysis";
import { handleAxiosError } from "../utils/handle-axios.errors";
import { useNavigate } from "react-router-dom";

export function GetNote() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [note, setNote] = useState<Note>({
    _id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [originalNote, setOriginalNote] = useState<Note>();
  const debouncedNote = useDebounce(note, 1000);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`${apiUrl}/note/${id}`);
        if (response.status === 200) {
          setNote(response.data.note);
          setOriginalNote(response.data.note);
        }
      } catch (error) {
        handleAxiosError(error);
      }
    };

    getNote();
  }, []);

  useEffect(() => {
    if (!originalNote) return;
    if (
      debouncedNote.title.trim() === originalNote.title.trim() &&
      debouncedNote.content.trim() === originalNote.content.trim()
    )
      return;
    const printReq = async () => {
      try {
        await axios.put(`${apiUrl}/note/${id}`, {
          title: debouncedNote.title.trim(),
          content: debouncedNote.content.trim(),
        });
        console.log("sended");
      } catch (error) {
        handleAxiosError(error);
      }
    };

    printReq();
  }, [debouncedNote.title, debouncedNote.content]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: "title" | "content"
  ) => {
    if (note) {
      setNote({ ...note, [field]: e.target.value });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/note/${id}`);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <>
      <main className="note-page">
        <section className="note-info">
          <input
            type="text"
            className="title-input"
            placeholder="Input the title..."
            value={note?.title || ""}
            onChange={(e) => handleChange(e, "title")}
          />
          <textarea
            name=""
            id=""
            className="content-textarea"
            placeholder="Input the content..."
            value={note?.content || ""}
            onChange={(e) => handleChange(e, "content")}
          />{" "}
          <div>
            <button onClick={handleDelete}>Delete note</button>
          </div>
        </section>{" "}
        <Analysis id={id} />
      </main>
    </>
  );
}
