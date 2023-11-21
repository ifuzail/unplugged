"use client"

import { useGetUsers } from "@/lib/react-query/queryAndMutation"
import Image from "next/image";
import { Loading } from "../shared/Loading";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const StoryCard = () => {

    const router = useRouter();
    const {data: users, isPending: isUserLoading,isError: isErrorCreators,} = useGetUsers()

    if(isErrorCreators) {
        toast({title: "Something went wrong."})
        return;
      }



  return (
   <section className="w-full">
       {isUserLoading && !users ? (
        <Loading />
       ) : (
        <div className="flex flex-row p-5 gap-4 mx-2 overflow-x-auto no-scrollbar">
           {users.documents.map((user) => (
                    <Link href={`/story/${user.$id}`}>
                    <div className="flex flex-col items-center">
                      <Image 
                      src={user?.imageUrl || '/default-user.png'}
                      width={500}
                      height={500}
                      alt="story"
                      onClick={onclick}
                      className={`${user.stories.length > 0 ? 'border-2 border-primary-Eleevan' : 'border-2 border-zinc-400'} w-16 h-16 rounded-full object-cover object-top `}
                      />
                      <h2 className="text-sm truncate w-20 text-zinc-300 mt-2">{user?.name}</h2>
                    </div>
                   </Link>
           ))}
        </div>
       )}
   </section>
  )
}
