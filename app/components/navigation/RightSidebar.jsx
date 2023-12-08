"use client"

import { usePathname } from "next/navigation";
import { CreateStoryButton } from "../custombuttons/CreateStoryButton"
import { FollowerList } from "../shared/FollowerList";
import { AIModel } from "../shared/AIModel";


export const RightSidebar = () => {

  const pathname = usePathname()

  const isActive = pathname === '/create-post'

  return (
    <section className="right-sidebar">
      {isActive ? (
        <div>
        <AIModel />
        </div>
      ) : (
      <div className="flex flex-col justify-start mb-3">
        <CreateStoryButton />
        <hr className="border border-dark-4 w-full mt-5 mb-5"/>
        <p className="h3-bold text-light-3 text-center">Folks, you&apos;re following</p>
        <FollowerList />
      </div>    
      )}
    </section>
  )
}

