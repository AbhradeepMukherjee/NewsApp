import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesCard from './NotesCard';
import InputNote from './InputNote';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../../../store/atom/token';
const Body = () => {
  const [notes,setNotes] = useState([]);
  const token = useRecoilValue(tokenAtom);
  console.log(token);

  const fetchNotes = async ()=>{
    try{
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/notes/bulk",
        config
      );
      console.log(data.notes);
      setNotes(data.notes);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
  fetchNotes();
  },[]);
  return (
    <div className='bg-slate-50 h-screen min-h-screen pt-10 p-6 flex'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4 mr-10'>
        {notes.map((note)=><NotesCard title={note.title} details={note.details}/>)}
      </div>
      <div className='w-1/4'>
        <InputNote/>
      </div>
    </div>
  )
}

export default Body;
