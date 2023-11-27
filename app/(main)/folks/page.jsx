"use client";

import { AllUsersCard } from "@/app/components/cards/AllUsersCard";
import { Loading } from "@/app/components/shared/Loading";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { useToast } from "@/app/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queryAndMutation";

const Folks = () => {

  const { toast } = useToast();
  const { user } = useUserContext();

  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }
  return (
    <ScrollArea className="bg-dark-3 w-full h-screen p-3">
      <div className="p-5">
        <h2 className="h1-bold mt-5 ">Folks</h2>
        {isPending && !creators ? (
          <Loading />
        ) : (
          <ul className="flex flex-col gap-6 justify-start mt-10 ">
            {creators?.documents
              .filter((creator) => creator?.$id !== user.id)
              .map((creator) => (
                <li
                  key={creator?.$id}
                  className="flex-1 min-w-[200px] w-full bg-dark-2 p-3 rounded-l-full rounded-r-md">
                  <AllUsersCard user={creator} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </ScrollArea>
  );
};

export default Folks;
