import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Search_box = () => {
  return (
    <div>
      <div className='w-full max-w-md px-2 mt-4'>
        <div className='flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)] transition'>
          <FiSearch className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search food...'
            className='w-full ml-3 bg-transparent outline-none text-lg text-gray-700 placeholder:text-gray-400'
          />
        </div>
      </div>
    </div>
  );
};

export default Search_box;
