"use client"

import { CreateStoryButton } from "../custombuttons/CreateStoryButton"
import { FollowerList } from "../shared/FollowerList";

export const RightSidebar = () => {

  return (
    <section className="right-sidebar">
      <div className="flex flex-col justify-start mb-3">
        <CreateStoryButton />
        <hr className="border border-dark-4 w-full mt-5 mb-5"/>
        <p className="h3-bold text-light-3 text-center">Folks, you&apos;re following</p>
        <FollowerList/>
      </div>
    </section>
  )
}

