"use client"

import { useUserContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation";

export default function Layout({children}) {

    const router = useRouter();
    const {isAuthenticated} = useUserContext();

    if(isAuthenticated) {
        router.push('/')
    }
    
  return (
    <div>
        {children}
    </div>
  )
}
