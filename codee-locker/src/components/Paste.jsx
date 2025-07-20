import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PasteRemove } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(PasteRemove(pasteId));
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <input
        className="w-full p-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="🔍 Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6">
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div
              key={paste?._id}
              className="border rounded-2xl p-5 shadow-md hover:shadow-lg transition bg-white"
            >
              <div className="text-xl font-semibold text-blue-800 mb-2">
                {paste.title}
              </div>
              <div className="text-gray-700 whitespace-pre-wrap mb-4">
                {paste.content}
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-md bg-yellow-100 hover:bg-yellow-200 text-yellow-700">
                  <NavLink to={`/?pasteid=${paste?._id}`}>Edit</NavLink>
                </button>
                <button className="px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <NavLink to={`/paste/${paste?._id}`}>View</NavLink>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to clipboard');
                  }}
                  className="px-4 py-2 rounded-md bg-green-100 hover:bg-green-200 text-green-700"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/paste/${paste?._id}`;
                    navigator.clipboard.writeText(url);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="px-4 py-2 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700"
                >
                  Share
                </button>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
