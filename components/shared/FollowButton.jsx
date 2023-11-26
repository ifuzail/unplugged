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
      <Button onClick={(e) => handleFollowUser(e)} className={isAlreadyFollowing ? 'bg-transparent border-2 border-primary-500 text-primary-500 transition-all base-medium ' : 'bg-primary-600 border-none hover:bg-primary-500 base-medium text-dark-4'}>
        { isAlreadyFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}
