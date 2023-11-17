"use client"

import { bottomLinks } from "@/constants"
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"


export const BottomBar = () => {

  const pathname = usePathname();

  return (
    <div className="md:hidden flex justify-center items-center space-x-7 bg-zinc-900 h-12 p-2 fixed bottom-0 left-0 w-full">
      {bottomLinks.map((bottomLink) => {

       const isActive = pathname === bottomLink.Url;
        return (
          <div key={bottomLink.id}>
            <Link href={bottomLink.Url} className={`text-zinc-100 ${isActive && "text-zinc-400"}`}>
              <i>{bottomLink.image}</i>
            </Link>
          </div>
        )
      })} 
      </div>
  )
}
