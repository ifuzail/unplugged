"use client"

import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import {multiFormatDateString } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";
import ReactPlayer from 'react-player/lazy'
import { Button } from "../ui/button";
import { VideoPlayer } from "../VideoPlayer";

export const VideoPostCard = ({post}) => {

  const {user} = useUserContext();

  if(!post.creator) return;



  return (
    <div className="bg-zinc-900 rounded-3xl lg:p-4 w-full p-4" >
        <div className='flex flex-row gap-3 text-white justify-between items-center p-3'>
             <Link href={`/profile/${post.creator.$id}`} className="flex flex-row gap-3">
                 <img
                   src={post?.creator?.imageUrl || '/default-user.png'}
                   alt='creator'
                   className="rounded-full w-12 h-12"
                 />
              <div className="flex flex-col">
                <p className="font-bold">
                  {post.creator.name}
                </p>
                <div className="flex items-center gap-2 text-zinc-400 font-semibold ">
                    <p>
                        {multiFormatDateString(post.$createdAt)}
                    </p>
                    -
                    <p>
                        {post.location}
                    </p>
                </div>
             </div>
             </Link>
             <Link 
             href={`/update-post/${post.$id}`}
             className={`${user.id !== post.creator.$id  && "hidden"}`}
             >
                <EditIcon className="w-5 text-primary-Eleevan hover:text-zinc-200"/>
             </Link>
        </div>
        <div>
        <Link href={`/posts/${post.$id}`}>
        <div className="py-5">
          <p className="text-zinc-200 text-xl font-semibold hover:underline">{post.caption}</p>
          <ul className="flex gap-1 mt-2 text-zinc-300 flex-wrap">
            {post.tags.map((tag, index) => (
              <li key={`${tag}${index}`} >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
        </div>
      <div className="p-5">
        <VideoPlayer
            videoUrl={post?.videoUrl}
            imageUrl={post?.imageUrl}
            />
      </div>
    </div>
  )
};