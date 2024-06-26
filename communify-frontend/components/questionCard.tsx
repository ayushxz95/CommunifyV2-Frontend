import { FaShare, FaUser, FaSave, FaThumbsUp, FaThumbsDown, FaDownload } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";

export default function QuestionCard() {
    return (
        <div>
            <div className="max-w-md mx-auto mt-30 bg-gray-100 rounded-xl shadow-2xl overflow-hidden md:max-w-2xl flex flex-col gap-4 p-8">

                <div className="">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser /></div>
                        <div className="ml-4 flex items-center justify-between w-11/12">
                            <div className="text-lg text-green-500 leading-tight font-semibold">John Doe</div>
                            {/* <button className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100">
                                <FaDownload className="text-zinc" />
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="">
                    <p className="block mt-1 text-lg leading-tight font-bold text-black">Lamba hai ri madam lamba. Teri jaan kasam hai lamba ?</p>
                </div>

                <div className="flex items-center gap-2">
                    <AiFillTags className="text-green-500 w-6 h-6" />
                    <div className="text-xs font-bold  text-red-400 p-1.5 rounded-full  min-w-8">CSS</div>
                    <div className="text-xs font-bold  text-blue-400 p-1.5 rounded-full  min-w-8">Blockchain</div>
                    <div className="text-xs font-bold  text-yellow-400 p-1.5 rounded-full  min-w-8">Networking</div>
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center justify-center cursor-pointer w-46 bg-white border border-green-500 text-green-500 rounded-full px-4 py-2 font-semibold hover:bg-green-500 hover:text-white">
                        See all Answer
                    </div>
                    <div className="flex items-center ml-auto justify-center cursor-pointer border-2 w-20 bg-green-500 text-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500">
                        Answer
                    </div>
                </div>

            </div>
        </div>
    );
}
