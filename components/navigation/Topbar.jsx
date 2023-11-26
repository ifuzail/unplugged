"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/AuthContext";
import Link from "next/link";
import { Loading } from "../shared/Loading";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { RightSidebar } from "./RightSidebar";
import { CreateStoryButton } from "../shared/CreateStoryButton";
import { FollowerList } from "../shared/FollowerList";

export const Topbar = () => {
  const router = useRouter();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const { user, isLoading: isUserLoading } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <section className="topbar md:hidden block">
      <div className="px-4 py-4 flex flex-row md:hidden justify-between items-center">
        {isUserLoading ? (
          <Loading />
        ) : (
          <>
            <Link href="/">
              <Image
                src="/eleevan-logo-white.svg"
                width={100}
                height={100}
                alt="logo"
                className="p-1"
              />
            </Link>
            <div className="flex flex-row items-center">
              <Button
                className="bg-transparent hover:bg-transparent"
                onClick={() => signOut()}>
                <LogOut className="text-zinc-200 w-5" />
              </Button>
              <Link href={`/profile/${user.id}`}>
                <Image
                  width={500}
                  height={500}
                  src={user.imageUrl || "/default-user.png"}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover object-top"
                />
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="w-5 h-5 ml-3" />
                </SheetTrigger>
                <SheetContent className="bg-zinc-900 w-80">
                  <SheetHeader>
                    <div className="flex flex-col justify-start mb-3">
                      <SheetClose>
                        <CreateStoryButton />
                      </SheetClose>
                      <hr className="border border-zinc-800 w-full mt-5 mb-5" />
                      <p className="h3-bold text-light-3 text-center">
                        Folks, you're following
                      </p>
                      <FollowerList />
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
