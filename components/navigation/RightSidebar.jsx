import { usePathname } from "next/navigation"
import { CreateStoryButton } from "../shared/CreateStoryButton"

export const RightSidebar = () => {

  const pathname = usePathname();

  return (
    <section className="w-[30%] h-screen bg-zinc-900 md:block hidden">
      <div>
        <CreateStoryButton />
      </div>
    </section>
  )
}

