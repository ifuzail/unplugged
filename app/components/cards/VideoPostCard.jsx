"use client";

import Link from "next/link";
import { multiFormatDateString } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";
import { VideoPlayer } from "../shared/VideoPlayer";
import Image from "next/image";
import { PostStats } from "../shared/PostStats";
import { Skeleton } from "../ui/skeleton";

export const VideoPostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="bg-dark-4 rounded-2xl lg:p-5 w-full max-w-screen-sm p-3">
      <div className="flex flex-row gap-3 text-white justify-between items-center md:p-3 p-1">
        <Link
          href={`/profile/${post.creator.$id}`}
          className="flex flex-row gap-3">
          <Image
            width={500}
            height={500}
            src={post?.creator?.imageUrl || "/default-user.png"}
            alt="creator"
            className="rounded-full md:w-12 md:h-12 w-9 h-9 object-cover object-top"
          />
          <div className="flex flex-col">
            <p className="md:h3-bold base-semibold">{post.creator.name}</p>
            <div className="flex items-center gap-2 text-zinc-400 font-semibold md:base-semibold small-semibold">
              <p>{multiFormatDateString(post.$createdAt)}</p>-
              <p>{post.location}</p>
            </div>
          </div>
        </Link>
        <Link
          href={`/edit-post-video/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <EditIcon className="md:w-5 w-4 text-primary-500 hover:text-primary-600" />
        </Link>
      </div>
      <div>
        <Link href={`/post/${post.$id}`}>
          <div className="p-5">
            <p className="text-light-2 md:base-semibold small-medium hover:underline">
              {post.caption}
            </p>
            <ul className="flex gap-1 mt-2 text-light-3 flex-wrap md:base-regular small-regular">
              {post.tags.map((tag, index) => (
                <li key={`${tag}${index}`}>#{tag}</li>
              ))}
            </ul>
          </div>
        </Link>
      </div>
      <div className="mb-4">
        {!post?.videoUrl ? (
          <Skeleton className='h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] mb-5 object-cover bg-dark-2 p-2'/>
        ) : (
         <VideoPlayer videoUrl={post?.videoUrl} imageUrl={post?.imageUrl} />
        )}
      </div>
      <div className="p-2">
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};
