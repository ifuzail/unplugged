import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export const AllUsersCard = ({user}) => {
  return (
    <Link href={`/profile/${user.$id}`} className="flex flex-row items-center gap-6">
        <Image 
         src={user.imageUrl || '/default-user.png'}
         width={500}
         height={500}
         alt="user-profile"
         className="rounded-full md:w-32 md:h-32 w-24 h-24 object-cover object-top"
        />

        <div className="flex flex-col justify-start items-start">
            <p className="text-3xl font-bold text-zinc-200">{user?.name}</p>
            <p className="text-sm text-zinc-400 mb-4">@{user?.username}</p>
            <Button type='button' size='sm' variant='secondary' className>
            Follow
            </Button>
        </div>

    </Link>
  )
}
