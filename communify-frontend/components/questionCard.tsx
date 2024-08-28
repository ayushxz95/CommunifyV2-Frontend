'use client'
import dompurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { AiFillTags } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export default function QuestionCard(props: {
    id: string,
    title: string,
    tags: Array<String>,
    description: string
}) {
    const router = useRouter();

    const handleSeeAllAnswersClick = () => {
        router.push(`/questionList/${props.id}`);
    };

    return (
        <div>
            <div className="max-w-md mx-auto mt-30 bg-gray-100 rounded-xl shadow-2xl overflow-hidden md:max-w-2xl flex flex-col gap-4 p-8">
                <div className="break-all">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser /></div>
                        <div className="ml-4 flex items-center justify-between w-11/12">
                            <div className="text-lg text-green-500 leading-tight font-semibold">{props.title}</div>
                        </div>
                    </div>
                </div>

                <div className="break-all">
                    <div className="prose max-w-full" dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(props.description, {
                            ADD_TAGS: ['iframe'],
                            ADD_ATTR: ['frameborder', 'allowfullscreen', 'tooltip', 'target']
                        })
                    }} />
                </div>

                {props?.tags?.length > 0 && <div className="flex items-center gap-2">
                    <AiFillTags className="text-green-500 w-6 h-6" />
                    {props?.tags?.map((tag, index) => (
                        <div key={index} className="text-xs font-bold text-red-400 p-1.5 rounded-full min-w-8">
                            {tag}
                        </div>
                    ))}
                </div>}

                <div className="flex items-center justify-between">
                    <div onClick={handleSeeAllAnswersClick} className="flex items-center justify-center cursor-pointer w-46 bg-white border border-green-500 text-green-500 rounded-full px-4 py-2 font-semibold hover:bg-green-500 hover:text-white">
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
