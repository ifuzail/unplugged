"use client";

import { Loading } from "@/app/components/shared/Loading";
import { PostStats } from "@/app/components/shared/PostStats";
import { CommentCard } from "@/app/components/cards/CommentCard";
import { CommentForm } from "@/app/components/forms/CommentForm";

import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { VideoPlayer } from "@/app/components/shared/VideoPlayer";
import { DeleteButton } from "@/app/components/custombuttons/DeleteButton";

const PostDetails = () => {

  const { postId } = useParams();
  const { user } = useUserContext();

  const { data: post, isPending } = useGetPostById(postId || "");

  return (
    <div className="md:p-8 p-6 h-[100vh] overflow-y-scroll custom-scrollbar">
      {isPending ? (
        <Loading />
      ) : (
        <section className="flex flex-col items-center gap-4">
          {/* post image */}
          <div className="md:h-[500px] md:w-[500px] w-full md:p-7">
            {post?.videoUrl === null ? (
              <Image
                priority
                className="rounded-xl object-cover mb-5 w-full md:h-[450px] h-72 object-top"
                src={post?.imageUrl}
                alt="post-image"
                width={500}
                height={500}
              />
            ) : (
              <VideoPlayer
                videoUrl={post?.videoUrl}
                imageUrl={post?.imageUrl}
              />
            )}
          </div>
          {/* user details */}
          <div className="flex flex-row justify-between gap-5">
            <Link
              href={`/profile/${post.creator.$id}`}
              className="flex flex-row gap-3">
              <Image
                width={500}
                height={500}
                src={post?.creator?.imageUrl || "/default-user.png"}
                alt="creator"
                className="rounded-full md:w-12 w-10 md:h-12 h-10 object-cover object-top"
              />
              <div className="flex flex-col">
                <p className="md:h3-bold base-semibold">{post.creator.name}</p>
                <div className="flex items-center gap-2 text-zinc-400 md:base-regular small-regular ">
                  <p>{multiFormatDateString(post.$createdAt)}</p>-
                  <p>{post.location}</p>
                </div>
              </div>
            </Link>
            <div className="flex flex-row items-center">
              <button>
                <Link
                  href={
                    post?.videoUrl === null
                      ? `/edit-post/${post.$id}`
                      : `/edit-post-video/${post.$id}`
                  }
                  className={`${user?.id !== post.creator.$id && "hidden"}`}>
                  <EditIcon className="md:w-5 w-4 text-primary-500 hover:text-primary-600" />
                </Link>
              </button>
              <DeleteButton post={post} />
            </div>
          </div>
          <hr className="border border-zinc-800 w-full mt-5" />
          {/* post details */}
          <div className="flex flex-col items-center">
            <div className="p-2 w-full">
              <p className="text-zinc-200 md:h3-bold small-semibold mb-3">
                {post.caption}
              </p>
              <ul className="flex gap-1 mt-2 text-zinc-300 flex-wrap">
                {post.tags.map((tag, index) => (
                  <li key={`${tag}${index}`}>#{tag}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* poststats */}
          <div>
            <PostStats post={post} userId={user.id} />
          </div>
          <hr className="border border-zinc-800 w-full mt-5" />
          <div>
            <CommentForm post={post} />
          </div>
          <hr className="border border-zinc-900 w-1/3 mt-10 " />
          <div>
            <CommentCard post={post} />
          </div>
        </section>
      )}
    </div>
  );
};

export default PostDetails;
