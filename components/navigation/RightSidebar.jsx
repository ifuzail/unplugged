"use client"

import { CreateStoryButton } from "../shared/CreateStoryButton"
import { FollowerList } from "../shared/FollowerList";

export const RightSidebar = () => {

  return (
    <section className="w-[30%] h-screen bg-zinc-900 md:block hidden">
      <div className="flex flex-col justify-start mb-3">
        <CreateStoryButton />
        <hr className="border border-zinc-800 w-full mt-5 mb-5"/>
        <p className="text-lg font-bold text-zinc-200 px-5">Folks, you're following</p>
        <FollowerList/>
      </div>
    </section>
  )
}

