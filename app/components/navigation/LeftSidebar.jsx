"use client";

import Image from "next/image";
import { Navlinks } from "./Navlinks";
import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";
import { Loading } from "../shared/Loading";

export const LeftSidebar = () => {
  const { user, isLoading: isUserLoading } = useUserContext();

  return (
    <section className="left-sidebar">
      <div>
        <div className="p-6 mb-3 mt-7">
          <Link href="/">
            <Image
              priority
              width={120}
              height={100}
              src="/eleevan-logo-white.svg"
              alt="left-logo-eleevan"
            />
          </Link>
        </div>
        <Navlinks />
      </div>
      <div className="flex flex-col items-start  gap-2 p-5">
        {isUserLoading || !user ? (
          <Loading />
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className="flex flex-row items-center p-2">
            <Image
              width={200}
              height={200}
              src={user.imageUrl || "/default-user.png"}
              alt="profile-image"
              className="h-12 w-12 rounded-full object-cover object-top"
            />
            <div className="px-3">
              <h1 className="font-bold text-lg ">{user.name}</h1>
              <p className="text-sm text-zinc-400">@{user.username}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};
