import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className='p-4 text-red-500'>Paste not found</div>;
  }

  return (
    <div className='p-4 max-w-4xl mx-auto'>

      <div className='flex flex-row gap-4 mb-4 '>
        <input
          className='p-2 rounded-xl border w-full'
          type="text"
          placeholder='Enter the title'
          value={paste.title}
          disabled
        />
      </div>

      <div className="relative">
        <textarea
          className='w-full p-3 rounded-xl border bg-gray-800 text-white'
          value={paste.content}
          placeholder='Place content here'
          disabled
          rows={20}
        />

        <span
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to clipboard!");
          }}
          className="absolute top-2 right-3 text-xl cursor-pointer hover:scale-110 transition-transform"
          title="Copy content"
        >
          📋
        </span>
      </div>
    </div>
  );
};

export default ViewPaste;
