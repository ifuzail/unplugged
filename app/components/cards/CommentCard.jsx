"use client"

import { useGetRecentComments } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";
import {Loading} from "../shared/Loading";
import { Skeleton } from "../ui/skeleton";

export const CommentCard = ({post}) => {
  const { data: comments, isPending: isCommentLoading } =
    useGetRecentComments();

  return (
    
    <section className="p-2 ">
        {isCommentLoading ? (
       <Skeleton className='p-5 w-56 h-20 rounded-xl bg-dark-4' /> 
        ) : (
            <div className="flex flex-col gap-3 justify-start items-start">
                {comments?.documents.filter((comment) => comment?.posts?.$id === post.$id).map((comment) => (
                    <div key={comment.$id} className="flex flex-row gap-2 items-center">
                        <div>
                            <Image
                             src={comment?.user?.imageUrl}
                             width={500}
                             height={500}
                             alt="user picture"
                             className="md:w-10 md:h-10 w-8 h-8 rounded-xl object-cover object-top"
                            />
                        </div>
                        <div
                        className="bg-light-3 md:w-[400px] h-auto p-3 rounded-xl flex flex-col"
                        >
                        <p className="text-dark-3 md:base-medium mb-2 ">{comment.message}</p>
                        <p className="subtle-semibold text-dark-4">{multiFormatDateString(comment.$createdAt)}</p>
                        </div>
                    </div>
                  ))}    
            </div>
        )}
    </section>
  );
};
