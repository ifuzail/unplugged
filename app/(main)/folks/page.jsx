"use client"

import { AllUsersCard } from "@/components/cards/AllUsersCard";
import { Loading } from "@/components/shared/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queryAndMutation";

const Folks = () => {
  const { toast } = useToast();

  const {data: creators, isPending, isError: isErrorCreators} = useGetUsers();

  if(isErrorCreators) {
    toast({title: "Something went wrong."})
    return;
  }
  return (
    <ScrollArea className="bg-zinc-900 w-full h-screen p-3">
      <div className="p-5">
        <h2 className="text-3xl font-bold mt-5 ">Folks</h2>
        {isPending && !creators ? (
          <Loading />
        ) : (
          <ul className="flex flex-col gap-6 justify-start mt-10 ">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full bg-zinc-800 p-3 rounded-l-full rounded-r-md">
                <AllUsersCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScrollArea>
  )
}

export default Folks;