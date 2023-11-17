"use client"

import { useUserContext } from '@/context/AuthContext';
import { Navigate } from "react-router-dom";

export default function AuthLayout({children}) {
    const {isAuthenthicated} = useUserContext();

    return (
        <>  
            {isAuthenthicated ? (
                <Navigate to='/' />
            ) : (
                <>
                   <section className="flex flex-1 justify-center items-center flex-col py-10">
                    {children}
                   </section> 
                </>
            )}
        </>
    )
}

