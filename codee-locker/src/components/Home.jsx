import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AddPaste, PasteUpdate } from '../redux/PasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [SearchParams, setSearchParams] = useSearchParams();
  const pasteId = SearchParams.get("pasteid");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const foundPaste = allPastes.find((p) => p._id === pasteId);
      setText(foundPaste.title);
      setValue(foundPaste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: text,
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(PasteUpdate(paste));
    } else {
      dispatch(AddPaste(paste));
    }
    setText('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='p-4'>

      <div className='flex flex-row gap-4 mb-4'>
        <input
          id='input'
          className='p-2 rounded-xl border w-full'
          type="text"
          placeholder='Enter the title'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={createPaste}
          className='p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 whitespace-nowrap'
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="relative">
        <textarea
          className='w-full p-2 rounded-xl border bg-gray-800 text-white'
          value={value}
          placeholder='Place content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
        <span
          onClick={() => {
            navigator.clipboard.writeText(value);
            toast.success("Copied to clipboard!");
          }}
          className="absolute top-2 right-3 text-xl cursor-pointer hover:scale-110 transition-transform"
          title="Copy content"
        >
          📋
        </span>
      </div>
    </div>
  )
}

export default Home
