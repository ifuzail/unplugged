"use client"

import { useUserContext } from "@/context/AuthContext"
import Image from "next/image";
import Link from "next/link";
import { VideoPlayer } from "./VideoPlayer";
import { PostStats } from "./PostStats";
import { ArrowUpRightIcon } from "lucide-react";

export const GridPostList = ({posts, showUser= true, showStats = true }) => {

  const {user} = useUserContext();

  return (
    <ul className="grid md:grid-cols-2 grid-cols-1 gap-3 p-5">
       {posts.map((post) => (
        <li key={post.$id} className="relative">
            {post.videoUrl === null ? (
             <Link href={`/post/${post.$id}`}>
              <Image
                src={post.imageUrl}
                width={500}
                height={500}
                alt="image post"
                className="h-[360px] w-[620px] object-cover rounded-xl "
              />
             </Link>
            ) : (
             <VideoPlayer 
             videoUrl={post.videoUrl} 
             imageUrl={post?.imageUrl}/>
            )}
            <div className="flex flex-row justify-between p-5 items-center">
              {showUser && (
                <>
                <div className="flex items-center gap-2 ">
                    <Image src={post.creator.imageUrl}  width={100} height={100} alt="creator" className="h-8 w-8 rounded-full object-cover object-top"/>
                    <p>{post.creator.name}</p>
                </div>
                </>
              )}
                    <Link href={`/post/${post.$id}`}>
                    <ArrowUpRightIcon className="mr-5"/>
                    </Link>
              {showStats && <PostStats post={post} userId={user.id}/>}
            </div>
        </li>
       ))}
    </ul>
  )
}
