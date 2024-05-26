import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../store/atom/token";

const InputNote = () => {
  const token = useRecoilValue(tokenAtom);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-black">
        Title:
      </label>
      <input
        type="text"
        className="bg-white border border-black rounded-md mb-2 text-black"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="" className="text-black">
        Body:
      </label>
      <textarea
        name="NoteBody"
        cols="30"
        rows="20"
        className="bg-white border border-black rounded-md text-black"
        style={{ resize: "none" }}
        value={details}
        onChange={(e)=>setDetails(e.target.value)}
      ></textarea>
      <button onClick={async()=>{
        await axios.post("http://localhost:8000/api/v1/notes/save", {
          "title": title,
          "details": details
        },{
          headers:{
            'Authorization': `Bearer ${token}` 
          }
        })
        setTitle("");
        setDetails("");
        inputRef.current.focus();
      }} className="bg-green-950 mt-1 hover:bg-green-800 h-112 text-white">
        Save
      </button>
    </div>
  );
};

export default InputNote;
