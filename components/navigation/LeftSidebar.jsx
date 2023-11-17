"use client";

import Image from "next/image";
import { Navlinks } from "./Navlinks";
import Link from "next/link";
import { useUserContext } from "@/context/AuthContext";

export const LeftSidebar = () => {

  const { user } = useUserContext();
 
  return (
    <section className="bg-zinc-900 h-screen w-[20%] md:flex flex-col hidden justify-between">
      <div>
        <div className="p-6 mb-3 mt-7">
          <Link href='/'>
            <Image 
            width={120} 
            height={100} 
            src="/eleevan-logo-white.svg"
            alt='logo' 
            />
          </Link>
        </div>
        <Navlinks />
      </div>
      <div className="flex flex-col items-start  gap-2 p-5">
        <Link
          href={`/profile/${user.id}`}
          className="flex flex-row items-center p-2"
        >
          <Image
            width={100}
            height={100}
            src={user.imageUrl || "/default-user.png"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="px-3">
            <h1 className="font-bold text-lg ">{user.name}</h1>
            <p className="text-sm text-zinc-400">@{user.username}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
