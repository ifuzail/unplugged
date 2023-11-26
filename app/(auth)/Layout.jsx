import { useUserContext } from "@/context/AuthContext"
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthLayout = ({children}) => {
    const router = useRouter()
    const {isAuthenticated} = useUserContext();
  return (
    <>
     {isAuthenticated ? (
        router.push('/')
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
export default AuthLayout