"use client";

import { useUserContext } from "@/context/AuthContext";
import { FaCirclePlus } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CreateStoryButton = () => {
  const router = useRouter();

  const { user } = useUserContext();

  const onclick = () => {
    router.push(`/create-story`);
  };

  return (
    <div className="p-3">
      <div className="create-story-btn relative">
        <Image
          src={user?.imageUrl || "/default-user.png"}
          width={500}
          height={500}
          alt="user-create-story"
          className="w-16 h-16 object-cover object-top rounded-2xl"
        />

        <div className="flex flex-col gap-2">
          <Link href={`/profile/${user?.id}`}>
            <h2 className="font-bold md:text-2xl text-lg text-zinc-200 hover:text-primary-Eleevan transition">
              {user?.name}
            </h2>
            <p className="text-sm text-zinc-400">@{user?.username}</p>
          </Link>
        </div>
        <button
          className="absolute bottom-1 left-14 border-4 rounded-full border-zinc-900 bg-zinc-900 text-primary-Eleevan"
          onClick={onclick}>
          <FaCirclePlus size={20} />
        </button>
      </div>
    </div>
  );
};
