'use client'
import React from "react";
import { FiMenu } from "react-icons/fi";
import { FaQuestion, FaHome, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import SearchBar from "./searchBar";
import { useState } from "react";
import type { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  console.log('navbar',user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSidenavOpen, setSideNav] = useState<boolean>(false);

  const handleHomeClick = () => {
    router.push('/home');
  };

  const handleQuestionListClick = () => {
    router.push('/questionList');
  };

  const handleSignOut = () => {
    // const { _id, refreshToken } = user;
    if (user) {
      console.log('id', user._id);
      dispatch(logoutUser({ userId: user._id, refreshToken: refreshToken, accessToken: accessToken}))
      router.push('/auth');
    }
  };

  const handleSignUpRedirect = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="w-full h-20 lg:h-28 border-b-[1px] border-green-500 text-black lg:text-zinc-700 shadow-lg sticky top-0 bg-white z-10">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center lg:justify-around justify-between">
        <a className="text-left text-3xl font-bold text-black" href='/home'>
          <span className="text-green-500">Comm</span>unify
        </a>
        <ul className="hidden lg:inline-flex items-center gap-8 uppercase text-sm font-semibold md:hidden">
          <li className="navbarLi" onClick={handleHomeClick}><FaHome className="text-gray-400 m-2 size-5 hover:bg-gray-100 cursor-pointer" /></li>
          <li className="navbarLi" onClick={handleQuestionListClick}><FaQuestion className="text-gray-400 m-2 size-5 hover:bg-gray-100 cursor-pointer" /></li>
          <li className="navbarLi" title="Coming soon"><IoChatbubblesOutline className="text-gray-400 m-2 size-5 hover:bg-gray-100 cursor-not-allowed" /></li>
        </ul>
        <div className="hidden lg:inline-block w-2/5">
          <SearchBar />
        </div>
        {user ? (
          <>
            <a className="w-10 h-10 rounded-full hidden lg:flex items-center justify-center bg-gray-200" href='/profile'>
              <FaUser title={user.username} />
            </a>
            <button onClick={handleSignOut} className=" border-2 border-green-500 bg-green-500 text-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Sign out</button>
          </>
        ) : (
          <div className="gap-3 hidden lg:flex">
            <button onClick={handleSignUpRedirect} className=" border-2 border-green-500 bg-green-500 text-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Sign up</button>
            <a href='/questionList' className=" border-2 border-green-500 bg-green-500 text-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">Try Anyway</a>
          </div>
        )}
        <div className="inline-flex lg:hidden" onClick={() => setSideNav(!isSidenavOpen)}>
          {!isSidenavOpen ? <FiMenu className="text-3xl" /> : <IoClose className="text-4xl" />}
        </div>
      </div>
      <div className={`fixed h-full w-60 right-0 gap-4 bg-green-500 lg:hidden transition-all duration-300 transform ${isSidenavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 text-white hover:text-green-500 hover:bg-white">
          <SearchBar />
        </div>
        <div className="p-4 text-white hover:text-green-500 hover:bg-white text-center font-bold">
          Home
        </div>
        <div className="p-4 text-white hover:text-green-500 hover:bg-white text-center font-bold">
          Questions
        </div>
        {user ? (
          <div className="p-4 text-white hover:text-green-500 hover:bg-white text-center font-bold">
            Sign Out
          </div>
        ) : (
          <div className="p-4 text-white hover:text-green-500 hover:bg-white text-center font-bold">
            Sign In
          </div>
        )}
        {!user && (
          <div className="p-4 text-white hover:text-green-500 hover:bg-white text-center font-bold">
            Try Anyway
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

