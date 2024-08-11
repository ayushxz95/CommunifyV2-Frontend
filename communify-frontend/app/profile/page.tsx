"use client";
import Footer from '@/components/footer';
import Image from 'next/image';
import { useState } from 'react';
import { FaPen, FaUser } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import TwoPeoplePuzzle from '../../images/twoPeoplePuzzle.jpg';

type Tab = 'questions' | 'answers';

export default function Profile() {
    const [selectedTab, setSelectedTab] = useState<Tab>('questions');

    const handleTabClick = (tab: Tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className=''>
            {/* <Navbar /> */}
            <div className="max-w-md mx-auto mt-30 bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl mt-8">
                <div className="p-6">
                    <div className='flex lg:gap-10 gap-5 items-center relative'>
                        <div className="flex items-center justify-center rounded-full border border-green-500 lg:w-40 w-16 h-16 lg:h-40  bg-gray-100 group hover:bg-gray-200">
                            <FaUser className="lg:text-6xl text-xl text-gray-300" />
                            <div className='invisible group-hover:visible absolute'>
                                <FaPen className='w-10 h-10' />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-green-500">Ayush Dubey</h1>
                        <div className=''>
                            <Image
                                src={TwoPeoplePuzzle}
                                alt='TwoPeoplePuzzle'
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>
                    <hr className="my-4 bg-gray-300 h-1" />
                    <div className='flex justify-around'>
                        <div className={`border-b-2 ${selectedTab === 'questions' ? 'border-green-500' : ''} w-48 flex justify-center`} onClick={() => handleTabClick('questions')}>
                            <h2 className="text-xl font-bold mb-2">Questions</h2>
                        </div>
                        <div className={`border-b-2 ${selectedTab === 'answers' ? 'border-green-500' : ''} w-48 flex justify-center`} onClick={() => handleTabClick('answers')}>
                            <h2 className="text-xl font-bold mb-2">Answers</h2>
                        </div>
                    </div>
                    {/* Render questions and answers based on selectedTab */}
                    {selectedTab === 'questions' && (
                        <div>
                            <div className='bg-gray-100 mt-4 p-8 gap-4 flex flex-col rounded-lg'>
                                <div className="">
                                    <p className="block mt-1 text-base leading-tight font-bold text-black">Why are you gay ?</p>
                                </div>
                                <div className="">
                                    <p className="block text-sm leading-tight font-medium text-zinc-400">I am because I am there is nothing i can do about it and I just love my self for being what I am and you know you should keep minding your own business</p>
                                </div>
                            </div>
                            <div className='bg-gray-100 mt-4 p-8 gap-4 flex flex-col rounded-lg'>
                                <div className="">
                                    <p className="block mt-1 text-base leading-tight font-bold text-black">Why are you gay ?</p>
                                </div>
                                <div className="">
                                    <p className="block text-sm leading-tight font-medium text-zinc-400">I am because I am there is nothing i can do about it and I just love my self for being what I am and you know you should keep minding your own business</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedTab === 'answers' && (
                        <div>
                            <div className='bg-gray-100 mt-4 rounded-lg'>
                                <div className='flex items-center justify-between p-8 pb-0 pt-8'>
                                    <div className='text-green-500 text-sm leading-tight font-medium'>12/07/2024</div>
                                    <div>
                                        <MdDelete className='text-red-500' />
                                    </div>
                                </div>
                                <div className="p-8 pb-2 pt-2">
                                    <p className="block mt-1 text-sm leading-tight font-bold text-black">Why are you gay ?</p>
                                </div>
                                <div className="p-8 pt-0">
                                    <p className="block text-sm leading-tight font-medium text-zinc-400">I am because I am there is nothing i can do about it and I just love my self for being what I am and you know you should keep minding your own business</p>
                                </div>
                            </div>
                            <div className='bg-gray-100 mt-4 rounded-lg'>
                                <div className='flex items-center justify-between p-8 pb-0 pt-8'>
                                    <div className='text-green-500 text-sm leading-tight font-medium'>12/07/2024</div>
                                    <div>
                                        <MdDelete className='text-red-500' />
                                    </div>
                                </div>
                                <div className="p-8 pb-2 pt-2">
                                    <p className="block mt-1 text-sm leading-tight font-bold text-black">Why are you gay ?</p>
                                </div>
                                <div className="p-8 pt-0">
                                    <p className="block text-sm leading-tight font-medium text-zinc-400">I am because I am there is nothing i can do about it and I just love my self for being what I am and you know you should keep minding your own business</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='mx-auto'>
                <Footer />
            </div>
        </div>
    );
}
