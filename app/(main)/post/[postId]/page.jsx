"use client";

import {Loading} from "@/components/shared/Loading";
import { PostStats } from "@/components/shared/PostStats";
import { CommentCard } from "@/components/cards/CommentCard";
import { CommentForm } from "@/components/forms/CommentForm";

import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { EditIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PostDetails = () => {

  const router = useRouter()
  const { postId } = useParams();
  const { data: post, isPending } = useGetPostById(postId || "");
  const {mutateAsync: deletePost, isPending: isDeletingPost} = useDeletePost()
  const { user } = useUserContext();

  const handleDeletePost = async () => {
       
        await deletePost({
         postId: post.$id, 
         imageId: post.imageId,
         videoId: post.videoId
      })
      
        router.push('/')
  
  };

  return (
    <div className="p-8 h-[100vh] overflow-y-scroll custom-scrollbar">
      {isPending ? (
        <Loading />
      ) : (
        <section className="flex flex-col items-center gap-4">
        {/* post image */}
            <div className="md:h-[500px] md:w-[500px] p-7">
              {post?.videoUrl === null ? (
                <Image
                className="rounded-[24px] object-cover mb-5 w-full h-[450px] object-top"
                src={post?.imageUrl}
                alt="post"
                width={500}
                height={500}
                />
              ) : (
                <VideoPlayer videoUrl={post?.videoUrl} imageUrl={post?.imageUrl}/> 
              )}
            </div>
            {/* user details */}
            <div className="flex flex-row justify-between gap-5">
             <Link href={`/profile/${post.creator.$id}`} className="flex flex-row gap-3">
                 <Image
                  width={500}
                  height={500}
                   src={post?.creator?.imageUrl || '/default-user.png'}
                   alt='creator'
                   className="rounded-full w-12 h-12 object-cover object-top"
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
                    href={post?.videoUrl === null ?  `/edit-post/${post.$id}` : `/edit-post-video/${post.$id}`}
                    className={`${user.id !== post.creator.$id  && "hidden"}`}
                    >
                        <EditIcon className="w-5 text-primary-Eleevan hover:text-zinc-200"/>
                    </Link>
                </button>
                <div  
                className={`${user.id !== post.creator.$id  && "hidden"}`}>
                  <Dialog>
                    <DialogTrigger>
                        <Trash className="w-5 text-red-600 hover:text-red-400"/>
                    </DialogTrigger>
                      <DialogContent className='bg-zinc-900'>
                        <p className="text-center text-lg">Do you want to delete this post, permanently?</p>
                        <div className="flex flex-row justify-around">
                          <Button 
                          onClick={() => router.back()}
                          variant='secondary'>
                            NO cancel it.
                          </Button>
                          <Button 
                           disabled={isDeletingPost}
                           onClick={handleDeletePost}
                           variant='destructive'>
                            {isDeletingPost}YES, go ahead.
                          </Button>
                        </div>
                      </DialogContent>
                  </Dialog>
                </div>
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
              <PostStats post={post} userId={user.id}/>
            </div>
            <hr className="border border-zinc-800 w-full mt-5"/>
            <div>
              <CommentForm post={post} />
            </div>
            <hr className="border border-zinc-900 w-1/3 mt-10 "/>
            <div>
              <CommentCard post={post}/>
            </div>
        </section>
      )}
    </div>
  );
};

export default PostDetails;
