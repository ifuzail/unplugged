import { useGetRecentComments } from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";
import {Loading} from "../shared/Loading";

export const CommentCard = ({post}) => {
  const { data: comments, isPending: isCommentLoading } =
    useGetRecentComments();

  return (
    
    <section className="p-2 ">
        {isCommentLoading ? (<Loading /> ) : (
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
                        className="bg-zinc-900 md:w-[400px] h-auto p-3 rounded-xl flex flex-col"
                        >
                        <p className="text-zinc-100 md:text-sm text-xs mb-2 ">{comment.message}</p>
                        <p className="text-xs text-zinc-400">{multiFormatDateString(comment.$createdAt)}</p>
                        </div>
                    </div>
                  ))}    
            </div>
        )}
    </section>
  );
};
