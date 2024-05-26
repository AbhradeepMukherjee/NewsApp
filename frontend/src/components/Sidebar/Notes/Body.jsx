import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesCard from "./NotesCard";
import InputNote from "./InputNote";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../store/atom/token";
const Body = () => {
  const [notes, setNotes] = useState([]);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/notes/bulk",
          config
        );
        if (notes !== data.notes) {
          setNotes(data.notes);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, [notes]);
  return (
    <div className="bg-slate-50 h-screen min-h-screen pt-10 p-6 flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4 mr-10">
        {notes.map((note) => (
          <NotesCard
            key={note._id}
            id={note._id}
            title={note.title}
            details={note.details}
          />
        ))}
      </div>
      <div className="w-1/4">
        <InputNote />
      </div>
    </div>
  );
};

export default Body;
