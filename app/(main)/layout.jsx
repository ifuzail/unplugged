"use client";

import { BottomBar } from "@/app/components/navigation/BottomBar";
import { LeftSidebar } from "@/app/components/navigation/LeftSidebar";
import { RightSidebar } from "@/app/components/navigation/RightSidebar";
import { Topbar } from "@/app/components/navigation/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const { checkAuthUser } = useUserContext();

  
useEffect(() => {
  const checkAuth = async () => {
    const isLoggedIn = await checkAuthUser();

    if(!isLoggedIn) {
      router.push('/login')
    }
  }

  checkAuth();
}, [])

  
  return (
    <div className="flex flex-row gap-1">
      <LeftSidebar />
      <div className="md:w-[50%] w-full flex flex-col justify-between">
        <div className="flex flex-col">
          <Topbar />
          <div className="md:mt-0 mt-16 md:mb-0 mb-12">{children}</div>
          <BottomBar />
        </div>
      </div>
       <RightSidebar />
    </div>
  );
};

export default MainLayout;
