import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes} from '../pasteSlice';

const ViewPaste = () => {

  const {id}=useParams();
const allPastes=useSelector((state)=>state.paste.pastes);
const paste = allPastes.find((p) => p._id === id);
 const formattedDate = paste
  ? new Date(paste.createdAt).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  : null;



  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 flex flex-col items-center py-12 px-4">
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl w-full max-w-3xl p-6 flex flex-col gap-6">
        
        {/* Header Section */}
        <h1 className="text-3xl font-semibold text-center text-purple-400 mb-2">
          View Note
        </h1>

        {formattedDate && (
          <p className="text-gray-400 text-sm text-center">
            Created on: {formattedDate}
          </p>
        )}

        {/* Title Input */}
        <input
          type="text"
          placeholder="Note title"
          value={paste?.title || ""}
          disabled
          className="bg-gray-800 text-gray-300 border border-gray-700 rounded-full px-5 py-2 w-full 
          focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-center"
        />

        {/* Content Area */}
        <textarea
          className="w-full rounded-2xl bg-gray-800 text-gray-100 border border-gray-700 p-4 min-h-[350px]
          focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition shadow-inner"
          value={paste?.content || ""}
          disabled
          placeholder="Your note content..."
          rows={18}
        />
      </div>
    </div>
  )
}

export default ViewPaste