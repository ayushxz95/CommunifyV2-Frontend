'use client'
import { FaShare, FaUser, FaHeart, FaThumbsUp, FaThumbsDown, FaDownload } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";

export default function Card() {
  const [isheartClicked, setHeart] = useState<boolean>(false);
  return (
    <div>
    <div className="max-w-md mx-auto mt-30 bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">

      <div className="p-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser/></div>
          <div className="ml-4 flex items-center justify-between w-11/12">
            <div className="text-lg text-green-500 leading-tight font-semibold">John Doe</div>
            <button className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100">
              <FaDownload className="text-zinc" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 pb-2 pt-2">
        <p className="block mt-1 text-lg leading-tight font-bold text-black">Why are you gay ?</p>
      </div>


      <div className="p-8 pt-0">
        <p className="block text-sm leading-tight font-medium text-zinc-400">I am because I am there is nothing i can do about it and I just love my self for being what I am and you know you should keep minding your own business</p>
      </div>

      <div className="flex items-center justify-between p-8 pt-0">
        <div className="flex items-center">
      <button className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100" onClick={() => {setHeart(!isheartClicked)}}>
        { !isheartClicked ?
        <CiHeart className="text-zinc text-xl" />
        :
        <FaHeart className="text-zinc text-xl" />
        }
      </button>
      </div>
      <button className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100">
        <FaShare className="text-zinc" />
      </button>
    </div>

    </div>
    </div>
  );
}
