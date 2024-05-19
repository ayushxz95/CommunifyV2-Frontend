"use client";
import { SetStateAction, useState } from 'react';
import { BsSearch } from "react-icons/bs";


const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    // Perform search action with the query
  };

  return (
    <div className="flex items-center bg-white rounded-full border border-green-500 overflow-hidden w-full">
      <input
        type="text"
        placeholder="What are you thinking..."
        value={query}
        onChange={handleInputChange}
        className="px-4 py-2 focus:outline-none w-11/12"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white h-full px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
