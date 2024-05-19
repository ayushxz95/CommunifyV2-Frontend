"use client";
import React from 'react';
import HomePage from '../images/homePage.jpg';
import Image from 'next/image';
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
    const [text] = useTypewriter({
        words: [
            "Your trusted community Platform.",
            "Providing best user experience for users.",
            "Get best solutions in a heartbeat.",
        ],
        loop: true,
        typeSpeed: 30,
        deleteSpeed: 10,
        delaySpeed: 2000,
    });

    return (
        <div className="flex justify-between items-center">
            <div>
                <div className="text-left text-sm lg:text-6xl font-bold text-black">
                    <span className="text-green-500 block">Join our</span>
                    <span className="text-zinc-600 block">Community</span>
                    <span className="text-green-500 block">to help others and</span>
                    <span className="text-zinc-600 block">get your doubts</span>
                    <span className="text-green-500 block">cleared.</span>
                </div>
            </div>
            <div>
                <Image
                    src={HomePage}
                    alt='homePage'
                    // className='w-20 h-20 lg:w-500 lg:h-500'
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}

export default Banner;
