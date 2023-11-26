"use client";

import Link from "next/link";
import { multiFormatDateString } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";
import { VideoPlayer } from "../shared/VideoPlayer";
import Image from "next/image";
import { PostStats } from "../shared/PostStats";

export const VideoPostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <div className="bg-zinc-900 rounded-3xl lg:p-4 w-full p-4">
      <div className="flex-between flex-row gap-3 text-light-2  p-3">
        <Link
          href={`/profile/${post.creator.$id}`}
          className="flex flex-row gap-3">
          <Image
            width={500}
            height={500}
            src={post?.creator?.imageUrl || "/default-user.png"}
            alt="creator"
            className="rounded-full w-12 h-12 object-cover object-top"
          />
          <div className="flex flex-col">
            <p className="font-bold">{post.creator.name}</p>
            <div className="flex items-center gap-2 text-zinc-400 font-semibold ">
              <p>{multiFormatDateString(post.$createdAt)}</p>-
              <p>{post.location}</p>
            </div>
          </div>
        </Link>
        <Link
          href={`/edit-post-video/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <EditIcon className="w-5 text-primary-600" />
        </Link>
      </div>
      <div>
        <Link href={`/post/${post.$id}`}>
          <div className="py-5 px-10">
            <p className="text-light-2 md:h3-bold base-semibold hover:underline">
              {post.caption}
            </p>
            <ul className="flex gap-1 mt-2 text-light-3 flex-wrap">
              {post.tags.map((tag, index) => (
                <li key={`${tag}${index}`}>#{tag}</li>
              ))}
            </ul>
          </div>
        </Link>
      </div>
      <div className="p-5">
        <VideoPlayer videoUrl={post?.videoUrl} imageUrl={post?.imageUrl} />
      </div>
      <div className="p-5">
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};
