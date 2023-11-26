"use client";

import { useGetUsers } from "@/lib/react-query/queryAndMutation";
import Image from "next/image";
import { Loading } from "../shared/Loading";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";

export const StoryCard = () => {
  const { user } = useUserContext();
  const {
    data: users,
    isPending: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  const followerStories = users?.documents?.filter((creator) =>
    creator?.followers?.includes(user.id)
  );


  return (
    <section className="w-full">
      {isUserLoading && !users ? (
        <Loading />
      ) : (
        <div className="flex flex-row p-5 gap-4 mx-2 overflow-x-auto no-scrollbar">
          <div>
            <Link href={`/story/${user.id}`}>
              <div className="flex flex-col items-center">
                <Image
                  src={user.imageUrl || "/default-user.png"}
                  width={500}
                  height={500}
                  alt="user-story"
                  className={`border-2 border-amber-400 w-16 h-16 rounded-full object-cover object-top `
                  }
                />
                <h2 className="text-sm truncate w-20 text-zinc-300 mt-2 text-center">
                  Your Story
                </h2>
              </div>
            </Link>
          </div>
          <hr className="border-r h-20 border-zinc-500" />
          {followerStories
            ?.filter((user) => user?.stories?.length !== 0)
            .map((user) => (
              <Link href={`/story/${user.$id}`}>
                <div className="flex flex-col items-center" key={user.$id}>
                  <Image
                    src={user?.imageUrl || "/default-user.png"}
                    width={500}
                    height={500}
                    alt="story"
                    className={`${
                      user.stories.length > 0
                        ? "border-2 border-primary-Eleevan"
                        : "border-2 border-zinc-400"
                    } w-16 h-16 rounded-full object-cover object-top `}
                  />
                  <h2 className="text-sm truncate w-20 text-zinc-300 mt-2 ml-2">
                    {user?.name}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
};
