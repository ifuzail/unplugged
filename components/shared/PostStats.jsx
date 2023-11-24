"use client"


import { useLikePost } from "@/lib/react-query/queryAndMutation"
import { checkIsLiked, shortenNumber } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import Image from "next/image"
import { useState } from "react";



export const PostStats = ({post , userId}) => {

  const likesList = post?.likes.map((user) => user.$id)
  
  const [likes, setLikes] = useState(likesList)
   
  const {mutate: likePost} = useLikePost();

  const isAlreadyliked = likes.includes(userId)
  
    const handleLikePost = (e) => {
        e.stopPropagation();

        let newLikes = [...likes];


        if(!isAlreadyliked) {
          newLikes.push(userId);

        } else {
          newLikes = newLikes.filter((id) => id !== userId);
        }

        setLikes(newLikes)
        likePost({
          post,
          postId: post.$id,
          likesArray: newLikes
        })
      }

  return (
    <div className="flex justify-between items-center">
        <div className="flex gap-2 mr-5">
           <Image
             src={checkIsLiked(likes, userId) 
                ? '/liked.png' 
                : '/like.png'
             }
             alt="like post"
             width={24}
             height={15}
             onClick={(e) => handleLikePost(e)}
             className="cursor-pointer w-5 h-5"
           /> 
           <p className="text-md text-white">{shortenNumber(likes.length)}</p>
        </div>
        <div className="flex flex-row items-center gap-2 text-zinc-100">
          <MessageSquareIcon className="w-5 h-5 "/>
          <span>
          {shortenNumber(post.comments.length)}
          </span> 
        </div>
    </div>
  )
}