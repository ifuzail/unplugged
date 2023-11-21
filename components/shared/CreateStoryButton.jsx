import { useUserContext } from "@/context/AuthContext"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsPlusCircleFill } from "react-icons/bs";

export const CreateStoryButton = () => {

 const router = useRouter();

  const { user } = useUserContext();

  const onclick = () => {
    router.push(`/create-story`)
  }
  return (
    <div className="p-3">
       <div className="flex flex-row gap-4 relative p-3 hover:shadow-lg shadow-black hover:scale-105 transition-all">
        <Image
         src={user?.imageUrl || '/default-user.png'}
         width={500}
         height={500}
         alt="user-create-story"
         className="w-16 h-16 object-cover object-top rounded-2xl "
        />

        <div className="flex flex-col gap-2">
            <Link href={`/profile/${user.id}`}
            >
                <h2 className="font-bold text-2xl text-zinc-200 hover:text-primary-Eleevan transition">{user?.name}</h2>
                <p className="text-sm text-zinc-400">@{user?.username}</p>
            </Link>
        </div>
        <button 
        className="absolute bottom-2 left-14"
        onClick={onclick}>
            <BsPlusCircleFill size={20}
            />
        </button>
       </div>
    </div>
  )
}
