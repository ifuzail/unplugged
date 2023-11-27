"use client";

import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queryAndMutation";
import { Loading } from "./Loading";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import Link from "next/link";

export const FollowerList = () => {
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

  const followers = users?.documents?.filter((creator) =>
    creator?.followers?.includes(user.id)
  );

  return (
    <section className="w-full">
      {isUserLoading && !users ? (
        <Loading />
      ) : (
        <div className="flex flex-col p-5 gap-2 mx-2 overflow-y-auto no-scrollbar">
          {followers
            .filter((follower) => follower.$id !== user.id)
            .map((follower) => (
              <Link href={`/profile/${follower.$id}`}  key={follower.$id}>
                <div
                  className="flex flex-row items-center md:gap-3 bg-light-3 p-3 rounded-full justify-start gap-5"
                 >
                  <Image
                    src={follower?.imageUrl || "/default-user.png"}
                    width={500}
                    height={500}
                    alt="story"
                    className="md:w-12 md:h-12 w-10 h-10 rounded-full object-cover object-top"
                  />
                  <div className="flex flex-col cursor-pointer">
                    <h2 className="truncate md:w-56 text-dark-3 hover:text-dark-1 md:h3-bold base-semibold">
                      {follower?.name}
                    </h2>
                    <p className="text-dark-4 base-regular">
                      @{follower?.username}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </section>
  );
};
