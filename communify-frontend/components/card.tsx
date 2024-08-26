'use client'
import { FaShare, FaUser, FaHeart, FaThumbsUp, FaThumbsDown, FaDownload } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import { likePost, savePost, unSavePost } from "@/store/postSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";

export default function Card(props: { 
  postId: string,
  authorName: string,
  title: string,
  mostLikedAnswers: string,
  isSaved: boolean,
  isLiked: boolean
}) {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div>
    <div className="max-w-md mx-auto mt-30 bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"><FaUser/></div>
          <div className="ml-4 flex items-center justify-between w-11/12">
            <div className="text-lg text-green-500 leading-tight font-semibold">{props.authorName}</div>
            <button 
              className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100"
              title={props.isSaved ? 'Click here to unsave the post' : 'Click here to save the post'}
            >
                <FaDownload className="text-zinc"
                  onClick={() => props.isSaved ? dispatch(unSavePost({
                    postId: props.postId,
                    refreshToken: auth.refreshToken,
                    accessToken: auth.accessToken
                  })) : dispatch(savePost({
                    postId: props.postId,
                    refreshToken: auth.refreshToken,
                    accessToken: auth.accessToken
                  }))}
                />
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 pb-2 pt-2">
        <p className="block mt-1 text-lg leading-tight font-bold text-black">{props.title}</p>
      </div>
                

      <div className="p-8 pt-0">
        <p className="block text-sm leading-tight font-medium text-zinc-400">{props.mostLikedAnswers}</p>
      </div>

      <div className="flex items-center justify-between p-8 pt-0">
        <div className="flex items-center"
        title={props.isLiked ? 'Click here to unlike this post' : 'Click here to like this post'}>
            <button className="text-green-500 font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300 ease-in-out hover:text-green-800 hover:bg-green-100"
              onClick={() => dispatch(likePost({
                postId: props.postId,
                reactionType: props.isLiked ? 'REMOVE_LIKE' : 'LIKE',
                refreshToken: auth.refreshToken,
                accessToken: auth.accessToken
              }))}
            >
              {!props.isLiked ?
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
