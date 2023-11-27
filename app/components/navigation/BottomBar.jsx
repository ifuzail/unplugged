"use client"

import { bottomLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const BottomBar = () => {

  const pathname = usePathname();

  return (
    <div className="bottom-bar">
      {bottomLinks.map((bottomLink) => {

       const isActive = pathname === bottomLink.Url;
        return (
          <div key={bottomLink.id}>
            <Link href={bottomLink.Url} className={`text-zinc-100 ${isActive && "text-primary-600"}`}>
              <i>{bottomLink.image}</i>
            </Link>
          </div>
        )
      })} 
      </div>
  )
}
