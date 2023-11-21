"use client"

import { Loading } from "@/components/shared/Loading"
import {StorySlider} from "@/components/shared/StorySlider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogOverlay } from "@/components/ui/dialog"
import { useGetUserById } from "@/lib/react-query/queryAndMutation"
import { useParams } from "next/navigation"

const StroyPage = () => {

    const {userId} = useParams();

    const {data: currentUser , isPending: isStoryLoading} = useGetUserById(userId || '')


  return (
   <Dialog defaultOpen={true}>
        <DialogOverlay className='bg-transparent'>
          {isStoryLoading ? <Loading /> : (
            <div>
              <StorySlider stories={currentUser?.stories} user={currentUser}/>
            </div>
          )}
        </DialogOverlay>
   </Dialog>
  )
}
export default StroyPage