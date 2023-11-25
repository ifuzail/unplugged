import { getRecentStories, getStoryById } from "@/lib/app-write/api"
import Link from "next/link"

export const StoryList = ({user}) => {

 let storyId
  return (
    <div>
        <Link href={`/story/${user.$id}/${storyId}`}>
          storyList
        </Link>
    </div>
  )
}