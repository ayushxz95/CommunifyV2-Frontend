'use client';
import { EDITOR_API_KEY } from "@/config";
import { fetchPostById } from "@/store/postSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import QuestionMark from "../../../images/threePeopleWithQuestion.jpg";

function ParticularQuestionDetails() {
  const dispatch = useAppDispatch();
  const [editorContent, setEditorContent] = useState<string>("");
  const pathname = usePathname()
  const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  const postData = useSelector((state: RootState) => state.posts.posts[0]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch]);

  const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
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



  return (
    <div className="flex px-14 py-8 bg-green-50 gap-10 items-center">
      <div className="flex w-3/4 flex-col bg-white p-4 rounded-lg">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser /></div>
          <div className="">
            <div className="text-2xl font-semibold">{postData?.title} ?</div>
            <div className="text-gray-400 mt-2">
              Posted by <span className="text-green-500">{postData?.authorId?.username.toUpperCase()}</span> on <span className="text-green-500">{postData?.createdAt ? formatDate(postData?.createdAt) : null}.</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="p-1 flex items-center bg-green-100 rounded-md text-green-500 border-2 border-green-500 border-solid">
                FrontEnd
              </div>
              <div className="p-1 flex items-center bg-green-100 rounded-md text-green-500 border-2 border-green-500 border-solid">
                Framework
              </div>
              <div className="p-1 flex items-center bg-green-100 rounded-md text-green-500 border-2 border-green-500 border-solid">
                Performance
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gray-200 w-full mt-8"></div>
        <div className="mt-4 p-2">
          <div className="break-all">
            <div className="prose max-w-full" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postData?.description, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['frameborder', 'allowfullscreen', 'tooltip', 'target']
              })
            }} />
          </div>
        </div>
        <div className="font-semibold text-xl mt-4">2 Answers</div>
        <div className="h-1 bg-gray-200 w-full mt-4 border-t border-dotted"></div>

        <div className="flex items-start gap-2.5 mt-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser /></div>
          <div className="flex flex-col w-fit leading-1.5 p-4 border-gray-200 bg-green-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Lakshya Hoffman</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">Next. js consumes server resources, thereby offering a faster site to the client, but it comes with a cost for the server delivering the site. On the other hand, Pure React is rendered on the client side, which might be a bit slower but it's a cost-saving approach for whoever serves the site.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 mt-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser /></div>
          <div className="flex flex-col w-fit leading-1.5 p-4 border-gray-200 bg-green-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Ayush Kapoor</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">Hawk thuu! Spit on that thing!</p>
          </div>
        </div>

        <div className="flex items-end gap-2.5 mt-4 ml-12 justify-items-end">
          <div className="w-[80%]">
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
          <div className="p-4 bg-green-500 text-white rounded-lg w-[20%] flex items-center justify-center">
            Add your answer
          </div>
        </div>

      </div>
      <div className="w-1/4 flex items-center h-full">
        <Image
          src={QuestionMark}
          alt='QuestionMark'
        />
      </div>
    </div>
  )
}

export default ParticularQuestionDetails