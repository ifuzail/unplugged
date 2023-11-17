"use client";

import Loader from "@/components/Loader";
import { PostStats } from "@/components/PostStats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Delete, DeleteIcon, EditIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const PostDetails = () => {
  const { postId } = useParams();
  const { data: post, isPending } = useGetPostById(postId || "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="p-8 h-[100vh] overflow-y-scroll custom-scrollbar">
      {isPending ? (
        <Loader />
      ) : (
        <section className="flex flex-col items-center gap-4">
        {/* post image */}
            <div className="md:h-[500px] md:w-[500px] p-7">
                <Image
                className="rounded-[24px] object-cover mb-5"
                src={post?.imageUrl}
                alt="post"
                width={500}
                height={500}
                />
            </div>
            {/* user details */}
            <div className="flex flex-row justify-between gap-5">
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
             <div className="flex flex-row items-center gap-3">
                <button>
                    <Link 
                    href={`/edit-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id  && "hidden"}`}
                    >
                        <EditIcon className="w-5 text-primary-Eleevan hover:text-zinc-200"/>
                    </Link>
                </button>
                <button>
                    <Trash className="w-5 text-red-600 hover:text-red-400"/>
                </button>
             </div>
            </div>
            <hr className="border border-zinc-800 w-full mt-5"/>
            {/* post details */}
            <div>
              <div className="py-5">
                <p className="text-zinc-200 text-xl font-semibold">{post.caption}</p>
                <ul className="flex gap-1 mt-2 text-zinc-300">
                  {post.tags.map((tag, index) => (
                    <li key={`${tag}${index}`}>
                        #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* poststats */}
            <div>
              <PostStats post={post} userId={user.$id}/>
            </div>
        </section>
      )}
    </div>
  );
};

export default PostDetails;
