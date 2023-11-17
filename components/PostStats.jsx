"use client"

import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queryAndMutation"
import { checkIsLiked } from "@/lib/utils";
import Image from "next/image"
import { useEffect, useState } from "react";


export const PostStats = ({post, userId}) => {

  const likesList = post.likes.map((user) => user.$id)
  
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)
  
  const {mutateAsync: likePost} = useLikePost();
  const {mutateAsync: savePost} = useSavePost();
  const {mutateAsync: deleteSavedPost} = useDeleteSavedPost();
  
  const {data: currentUserData} = useGetCurrentUser();
  

  const savedPostRecord = currentUserData?.save.find(
    (record) => record.post.$id === post.$id
   )

  useEffect(() => {
   setIsSaved(!!savedPostRecord)
  }, [currentUserData])
  

    const handleLikePost = (e) => {
        
        e.stopPropagation()

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
          likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
          likesArray.push(userId)
        }
        setLikes(likesArray)
        return (
          likePost(post.$id, likesArray)
          )

    }

    const handleSavePost = (e) => {
      
      e.stopPropagation();

      if(savedPostRecord) {
        setIsSaved(false)
        return deleteSavedPost(savedPostRecord.$id);
      }
      savePost({ userId: userId, postId: post.$id });
        setIsSaved(true)

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
             className="cursor-pointer"
           /> 
           <p className="text-md text-white">{likes.length}</p>
        </div>
        <div className="flex gap-2">
           <Image
             src={isSaved 
                ? '/saved.png' 
                : '/save.png'}
             width={24}
             height={15}
             alt="save post"
             onClick={handleSavePost}
             className="cursor-pointer"
           /> 
           
        </div>
    </div>
  )
}