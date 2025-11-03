import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Safe filtering
  const filteredData = [...pastes]
    .filter((paste) => paste && paste.title && paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .reverse(); // latest first

  function handleDelete(pasteID) {
      dispatch(removeFromPastes(pasteID));
      toast.success('Note deleted!');
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8 text-purple-400">
        My Notes
      </h1>

      <div className="flex justify-center mb-8">
        <input
          className="p-3 rounded-xl w-full sm:w-[80%] md:w-[70%] lg:w-[60%] bg-[#1C1C1C] text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          type="search"
          placeholder="🔍 Search Notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-6 items-center">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            if (!paste) return null;

            const formattedDate = paste.createdAt
              ? new Date(paste.createdAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })
              : '';

            return (
              <div
                key={paste._id}
                className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] bg-[#1A1A1A] border border-gray-800 rounded-2xl shadow-md p-6 hover:shadow-purple-700/30 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-purple-400">
                    {paste.title || 'Untitled Note'}
                  </h2>
                  <span className="text-xs text-gray-400">{formattedDate}</span>
                </div>

                <p className="text-gray-300 mb-5 whitespace-pre-wrap">
                  {paste.content
                    ? paste.content.length > 250
                      ? paste.content.slice(0, 250) + '...'
                      : paste.content
                    : 'No content'}
                </p>

                <div className="flex flex-wrap gap-3 justify-between">
                  <a
                    href={`/?pasteID=${paste._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Edit
                  </a>

                  <a
                    href={`/pastes/${paste._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    View
                  </a>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content || '');
                      toast.success('Copied to Clipboard!');
                    }}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: paste.title || 'Note',
                          text: paste.content || '',
                          url: window.location.href,
                        });
                      } else {
                        toast('Sharing not supported on this browser', { icon: '⚠️' });
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Share
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 mt-10 text-lg">No notes found 😕</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
