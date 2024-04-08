import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesCard from './NotesCard';
import InputNote from './InputNote';
const Body = () => {
  const [notes,setNotes] = useState([]);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/v1/notes/bulk',
    headers: { 
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI5ZjYzYTY2ZDBiMjMxY2E0NjI1NDkiLCJpYXQiOjE3MDY3MTc1OTd9.snTL2YAtHeKd3KenfzRykQm122_EzcZcN-TVp1B__yg` 
    }
  };
  useEffect(()=>{
  axios.request(config)
  .then((response) => {
    setNotes(response.data.notes);
  })
  .catch((error) => {
    console.log(error);
  });
  },[notes]);
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
