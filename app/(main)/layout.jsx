"use client";

import { BottomBar } from "@/app/components/navigation/BottomBar";
import { LeftSidebar } from "@/app/components/navigation/LeftSidebar";
import { RightSidebar } from "@/app/components/navigation/RightSidebar";
import { Topbar } from "@/app/components/navigation/Topbar";

const MainLayout = ({ children }) => {
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
