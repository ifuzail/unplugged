"use client"

import { BottomBar } from "@/components/navigation/BottomBar";
import { LeftSidebar } from "@/components/navigation/LeftSidebar";
import { RightSidebar } from "@/components/navigation/RightSidebar";
import { Topbar } from "@/components/navigation/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { isAuthenthicated } = useUserContext();
    return (
      <>
      {isAuthenthicated ? <Navigate to="/" /> : (
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
      )}
    </>
    );
  }

export default MainLayout;
