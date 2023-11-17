"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import Link from "next/link";

export const Topbar = () => {
  const router = useRouter();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <section className="bg-zinc-900 h-18 fixed top-0 z-10 w-full ">
      <div className="px-4 py-4 flex flex-row  md:hidden justify-between">
        <Image src="/eleevan-logo-white.svg" width={100} height={100} alt="logo" />
        <div className="flex flex-row items-center">
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={() => signOut()}
          >
            <LogOut className="text-zinc-200 w-5" />
          </Button>
          <Link href={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "default-user.png"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
