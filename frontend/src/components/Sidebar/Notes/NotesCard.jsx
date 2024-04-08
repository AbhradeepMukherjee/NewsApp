import React from 'react';
import { MdDelete, MdEditSquare } from "react-icons/md";
const NotesCard = ({title, details}) => {
  return (
    <div className="max-w-sm h-[12rem] rounded overflow-hidden shadow-2xl relative">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black border border-b-black border-transparent">{!title? details: title}</div>
        <p className="text-gray-700 text-base line-clamp-3 text-left">{details}</p>
      </div>
      <div className="px-6 pb-4 flex justify-around absolute bottom-0 inset-x-0">
        {/*  onClick={async ()=>{
          await }}  */}
          <MdDelete className='text-red-900 cursor-pointer text-2xl'/>
        <MdEditSquare className='text-yellow-900 cursor-pointer text-2xl'/>
      </div>
    </div>
  )
}

export default NotesCard;
