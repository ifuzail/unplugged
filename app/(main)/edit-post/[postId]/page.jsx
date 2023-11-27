"use client";

import { NormalPostForm } from "@/app/components/forms/NormalPostForm";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { ImageIcon, } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetPostById } from "@/lib/react-query/queryAndMutation";
import {Loading} from "@/app/components/shared/Loading";

const EditPost = () => {

  const { postId } = useParams();
  const { data: post, isPending } = useGetPostById(postId || '');

  if(isPending) return <Loading />

  return (
      <ScrollArea className="bg-zinc-900 w-full h-screen p-3">
          <div className="flex items-center gap-1 mt-10 justify-start">
            <ImageIcon size={28}/>
            <h1 className='font-bold text-2xl text-zinc-200'>Edit post</h1>
          </div>
        
        <div className="w-full">
                <NormalPostForm post={post} action='update'/>
        </div>
      </ScrollArea>
  );
};

export default EditPost;
