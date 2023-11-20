import { useGetUsers } from "@/lib/react-query/queryAndMutation"
import Image from "next/image";
import { Loading } from "../shared/Loading";

const StoryCard = () => {

    const {data: users, isPending: isUserLoading,isError: isErrorCreators} = useGetUsers()

    if(isErrorCreators) {
        toast({title: "Something went wrong."})
        return;
      }

    const onclick = () => {

    }

  return (
   <section className="w-full">
       {isUserLoading && !users ? (
        <Loading />
       ) : (
        <div className="flex flex-row p-5 gap-4 mx-2 overflow-x-auto no-scrollbar">
           {users.documents.map((user) => (
                <div key={user.$id} >
                    <Image 
                     src={user?.imageUrl || '/default-user.png'}
                     width={500}
                     height={500}
                     alt="story"
                     onClick={onclick}
                     className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary-Eleevan"
                    />
                    <h2 className="text-sm truncate w-20 text-zinc-300 mt-2">{user?.name}</h2>
            </div>
           ))}
        </div>
       )}
   </section>
  )
}
export default StoryCard