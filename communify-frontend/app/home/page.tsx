'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EDITOR_API_KEY } from "@/config";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Card from "../../components/card";
import Footer from "../../components/footer";
import Navbar from "../../components/navBar";

export default function Home() {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [editorContent, setEditorContent] = useState<string>("");

    const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {
        console.log('I am here');
        try {
            const file = blobInfo.blob();
            const formData = new FormData();
            formData.append("file", file, blobInfo.filename());

            const response = await fetch("http://localhost:4000/api/v1/upload/signed/url", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const { url } = result;
                success(url);
            } else {
                failure("Image upload failed");
            }
        } catch (error) {
            failure("Image upload failed");
        }
    };

    const customFilePicker = (callback: any, value: any, meta: any) => {
        console.log('I am here');
        if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = async function () {
                const file = input.files[0];
                const blobInfo = await new Promise<any>((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => resolve(reader.result);
                });

                handleImageUpload(
                    blobInfo,
                    (url: string) => {
                        callback(url, { title: file.name });
                    },
                    (error: string) => {
                        console.error(error);
                    }
                );
            };
            input.click();
        }
    };

    return (
        <div>
            <Navbar />
            <Dialog >
                <DialogTrigger>
                    <div className="fixed lg:right-44 right-2 top-26 lg:top-36 cursor-pointer rounded-full
                    w-12 h-12 bg-green-500 hover:border-2 hover:border-green-500 hover:bg-white text-white
                    hover:text-green-500 flex items-center justify-center">
                        <FaPlus className="h-12" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="text-green-500">Add Question</div>
                        </DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="title" className="text-green-500">
                                        Enter your question title
                                    </Label>
                                    <Input id="title" placeholder="Start the question" />
                                </div>
                                <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="description" className="text-green-500">
                                        Enter your question description
                                    </Label>
                                    <div>
                                        <Editor
                                            apiKey={EDITOR_API_KEY}
                                            textareaName="content"
                                            onEditorChange={(content) => {
                                                setEditorContent(content);
                                            }}
                                            init={{
                                                height: 300,
                                                menubar: false,
                                                placeholder: "Write your question here",
                                                plugins: [
                                                    "advlist",
                                                    "autolink",
                                                    "lists",
                                                    "link",
                                                    "image",
                                                    "fullscreen",
                                                    "insertdatetime",
                                                    "media",
                                                    "table",
                                                    "code",
                                                    "help",
                                                    "wordcount",
                                                ],
                                                toolbar:
                                                    "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image",
                                                toolbar_mode: "sliding",
                                                images_upload_url: "http://localhost:4000/api/v1/upload/signed/url",
                                                automatic_uploads: true,
                                                images_reuse_filename: true,
                                                images_upload_handler: handleImageUpload,
                                                file_picker_callback: customFilePicker,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-2">
                                    <Label htmlFor="tag" className="text-green-500">
                                        Tag
                                    </Label>
                                    <Input id="tag" placeholder="i.e React, CSS, HTML" />
                                </div>
                                <div className="flex ml-auto mt-4 gap-4">
                                    <DialogClose>
                                        <div className="flex items-center justify-center cursor-pointer border-2 w-20 bg-green-500 text-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500">
                                            Close
                                        </div>
                                    </DialogClose>
                                    <div
                                        // onClick={handleSubmit}
                                        className="flex items-center justify-center cursor-pointer border-2 w-20 bg-green-500 text-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500"
                                    >
                                        Submit
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-y-8 mt-2 px-4 lg:px-0">
                <Card />
                <Card />
                <Card />
            </div>
            <Footer />
        </div>
    );
}
