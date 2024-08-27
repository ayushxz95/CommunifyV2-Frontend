"use client";
import { FaInstagram } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Footer = () => {
    const [text] = useTypewriter({
        words: [
            "Your trusted community Platform.",
            "Providing best user experience for users.",
            "Get best solutions in a heart beat.",
        ],
        loop: true,
        typeSpeed: 30,
        deleteSpeed: 10,
        delaySpeed: 2000,
    });
    return (
        <footer className="bg-green-100 text-white py-6 mt-8">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center px-4">
                <div>
                    <div className="text-left text-3xl font-bold text-black">
                        <span className="text-green-500">Comm</span>unify
                    </div>
                    <p className="text-green-500 md:text-lg font-semibold mt-2">
                        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#34D399" />
                    </p>
                    <p className="mt-2 text-black text-xs lg:text-base">For queries, email us at: <a href="mailto:your.email@gmail.com" className="text-green-500 hover:text-green-700">communify@gmail.com</a></p>
                </div>
                <div className='flex flex-row lg:flex-col lg:tems-center lg:justify-center text-left'>
                    <div className="mt-2 text-black lg:text-center flex lg:flex-col items-center text-xs lg:text-base">Follow us on Instagram
                        <div className="flex lg:items-center lg:justify-center text-green-500 hover:text-green-700 lg:text-center lg:mt-2 mt-0 ml-2 lg:ml-0 cursor-pointer">
                            <FaInstagram />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
