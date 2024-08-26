'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EDITOR_API_KEY } from "@/config";
import { createPost, fetchAllPosts, updateTag, updateTitle } from "@/store/postSlice";
import { RootState, useAppDispatch } from "@/store/store";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "../../components/card";
import Footer from "../../components/footer";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="right" ref={ref} {...props} timeout={{ enter: 500, exit: 500 }} />;
});

export default function Home() {
    const dispatch = useAppDispatch();
    const editor = useRef(null);
    const [editorContent, setEditorContent] = useState<string>("");
    const [open, setOpen] = useState(false);
    const posts = useSelector((state: RootState) => state.posts);
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchAllPosts({ refreshToken: auth.refreshToken, accessToken: auth.accessToken }));
    }, [dispatch]);

    const handleTitleChange = (e: any) => {
        dispatch(updateTitle(e.target.value));
    };

    const handleTagChange = (e: any) => {
        dispatch(updateTag(e.target.value));
    };

    const handleSubmit = () => {
        const postData = {
            title: posts?.title,
            description: editorContent,
            tags: Array.isArray(posts?.tags) ? posts.tags : [],
            authorId: auth?.user?._id || ""
        }
        dispatch(createPost({ postData: postData, refreshToken: auth.refreshToken, accessToken: auth.accessToken }));
        setOpen(false);
    };

    const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {
        console.log("I am in handleImageUpload");

        try {
            const file = blobInfo.blob();

            const response = await fetch("http://localhost:4000/api/v1/upload/signed/url", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileName: file.name })
            });

            if (response.ok) {
                const result = await response.json();
                const { url } = result.data;

                const uploadResponse = await fetch(url, {
                    method: "PUT",
                    body: file
                });

                if (uploadResponse.ok) {
                    success(url.split('?')[0]);
                } else {
                    const errorText = await uploadResponse.text();
                    console.error('Failed to upload image:', uploadResponse.status, errorText);
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to get signed URL:', response.status, errorText);
            }
        } catch (error) {
            console.error('Error in image upload:', error);
        }
    };



    const customFilePicker = (callback: any, value: any, meta: any) => {
        if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.style.zIndex = "1000";
            input.onchange = async function () {
                // @ts-ignore: Unreachable code error
                const file = input.files[0];
                const blobInfo = {
                    blob: () => file,
                    filename: file.name
                };

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


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className="fixed lg:right-44 right-2 top-26 lg:top-36 cursor-pointer rounded-full
                    w-12 h-12 bg-green-500 hover:border-2 hover:border-green-500 hover:bg-white text-white
                    hover:text-green-500 flex items-center justify-center" onClick={handleClickOpen}>
                <FaPlus className="h-12" />
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogTitle>
                    <div className="text-green-500">Add Question</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="title" className="text-green-500">
                                    Enter your question title
                                </Label>
                                <Input id="title" placeholder="Start the question" onChange={handleTitleChange} />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description" className="text-green-500">
                                    Enter your question description
                                </Label>
                                <div className="relative">
                                    <Editor
                                        apiKey={EDITOR_API_KEY}
                                        textareaName="content"
                                        onEditorChange={(content) => {
                                            setEditorContent(content);
                                        }}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            branding: false,
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
                                            // @ts-ignore: Unreachable code error
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
                                <Input id="tag" placeholder="i.e React, CSS, HTML" onChange={handleTagChange} />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                        Close
                    </button>
                    <button onClick={handleSubmit} className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                        Submit
                    </button>
                </DialogActions>
            </Dialog>

        <div className="flex flex-col gap-y-8 mt-2 px-4 lg:px-0">
          {Object.values(posts.posts)?.map((post: any) => {
            return (
              <Card
                key={post?._id}
                postId={post?._id}
                authorName={post?.authorName}
                title={post?.title}
                isSaved={post?.isSaved}
                isLiked={post?.mostLikedAnswer?.isLiked}
                mostLikedAnswers={post?.mostLikedAnswer?.content || 'No answers yet'}
              />
            );
          })}
        </div>
            <Footer />
        </div>
    );
}