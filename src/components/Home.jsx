import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [paste, setPaste] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteID = searchParams.get('pasteID');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Load existing paste when editing
  useEffect(() => {
    if (pasteID && allPastes.length > 0) {
      const foundPaste = allPastes.find((p) => p && p._id === pasteID);
      if (foundPaste) {
        setTitle(foundPaste.title || '');
        setValue(foundPaste.content || '');
        setPaste(foundPaste);
      } else {
        // Reset fields if paste not found
        setTitle('');
        setValue('');
        setPaste(null);
      }
    }
  }, [pasteID, allPastes]);

  function createPaste() {
  if (!title.trim() && !value.trim()) {
    toast.error('Note cannot be empty!');
    return;
  }

  const newPaste = {
    title: title.trim(),
    content: value.trim(),
    _id: paste?._id || pasteID || crypto.randomUUID(), // ✅ safe ID
    createdAt: paste?.createdAt || new Date().toISOString(),
  };

  if (pasteID || paste) {
    console.log("Updating paste:", newPaste);

    dispatch(updateToPastes(newPaste));
  } else {
    dispatch(addToPastes(newPaste));
  }

  setTitle('');
  setValue('');
  setPaste(null);
  setSearchParams({});
}


  const formattedDate = paste
    ? new Date(paste.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 flex flex-col items-center py-10 px-4">
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl w-full max-w-3xl p-6 flex flex-col gap-5 animate-fadeIn">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 text-gray-100 border border-gray-700 rounded-full px-5 py-2 w-full sm:w-2/3 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={createPaste}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full 
              hover:from-indigo-500 hover:to-blue-500 shadow-md shadow-blue-900/40 transition-all duration-300"
          >
            {pasteID ? 'Update Note' : 'Create Note'}
          </button>
        </div>

        {formattedDate && (
          <p className="text-gray-400 text-sm text-center sm:text-left">
            Created on: {formattedDate}
          </p>
        )}

        {/* Text Area */}
        <textarea
          className="w-full rounded-xl bg-gray-800 text-gray-100 border border-gray-700 p-4 min-h-[350px]
            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition shadow-inner"
          value={value}
          placeholder="Write your note here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
