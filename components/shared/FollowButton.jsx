import { useState } from "react"
import { Button } from "../ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useFollowUser } from "@/lib/react-query/queryAndMutation";


export const FollowButton = ({ currentUser }) => {

  const {user: loggedInUser} = useUserContext();
  const {mutate: followUser} = useFollowUser(); 
  
  const followersArray = currentUser?.followers.map((follower) => follower);

  const [isFollow, setIsFollow] = useState(false)
  const [followers, setFollowers] = useState(followersArray)

  const isAlreadyFollowing = followers.includes(loggedInUser.id);
  
  const handleFollowUser = (e) => {
      e.stopPropagation();

      let newFollowers = [...followers];

      if (!isAlreadyFollowing) {
        newFollowers.push(loggedInUser.id);

        } else {

            newFollowers = newFollowers.filter((followerId) => followerId !== loggedInUser.id); 
            setIsFollow(false)
        }

      setFollowers(newFollowers);
      setIsFollow(true);

      followUser({
            user: currentUser,
            userId: currentUser.$id,
            followArray: newFollowers
        })
     

    }

  return (
    <div className="mt-4">
      <Button onClick={(e) => handleFollowUser(e)} variant='secondary' className={isAlreadyFollowing ? 'bg-transparent border-2 border-primary-Eleevan text-zinc-100 hover:bg-zinc-900 hover:border-primary-Eleevan/60 transition-all' : 'bg-primary-Eleevan border-none hover:bg-primary-Eleevan/60'}>
        { isAlreadyFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}
