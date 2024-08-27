'use client';

import Footer from '@/components/footer'
import QuestionCard from '@/components/questionCard'
import { fetchAllPostsWithTags } from '@/store/postSlice';
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect } from 'react';
import { useSelector } from "react-redux";

export default function QuestionList() {
  const dispatch = useAppDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAllPostsWithTags({ refreshToken: auth.refreshToken, accessToken: auth.accessToken }));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-grow flex flex-col gap-8 mt-4 px-4 lg:px-0">
        {Object.values(posts?.postWithTags)?.length > 0 ? (
          Object.values(posts?.postWithTags).map((post: any) => (
            <QuestionCard
              key={post?._id}
              title={post?.title}
              description={post?.description}
              tags={post?.tags}
            />
          ))
        ) : (
          <div className="flex-grow flex items-center justify-center text-center text-gray-500">
            <p>No posts available</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
