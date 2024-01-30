"use client"

import { VideoPostCard } from "@/app/components/cards/VideoPostCard";
import { PostCard } from "@/app/components/cards/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutation"
import {StoryCard} from "@/app/components/cards/StoryCard";
import { Skeleton } from "@/app/components/ui/skeleton";

const Home = () => {

  const {data: posts, isPending: isPostLoading} = useGetRecentPosts();

  return (
    <>
    <div className="container-scroll">
        <div>
         <StoryCard />
        </div>
        <div className="p-5">
            <h2 className="h1-bold w-full mb-5 text-light-2">Home Feed</h2>
          <Tabs defaultValue="normal" className="mt-2 mb-3">
              <TabsList className='w-full bg-dark-3'>
                <TabsTrigger value='normal' className='w-full '>Normal</TabsTrigger>
                <TabsTrigger value='video' className='w-full'>Videos</TabsTrigger>
              </TabsList>
         
          <TabsContent value='normal'>
              {isPostLoading && !posts ? (
                <Skeleton className='bg-dark-4 rounded-2xl lg:p-5 w-full max-w-screen-sm p-3 h-96'/>
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full mt-5">
                    {posts?.documents.filter((post) => post?.videoUrl === null).map((post) => (
                      <li key={post?.$id} className="flex justify-center w-full">
                      <PostCard post={post} key={post?.caption}/>
                    </li>
                    ))}
                </ul>
              )}
          </TabsContent>
          <TabsContent value='video'>
              {isPostLoading && !posts ? (
                 <Skeleton className='bg-dark-4 rounded-2xl lg:p-5 w-full max-w-screen-sm p-3 h-96'/>
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full mt-5">
                    {posts?.documents.filter((post) => post.videoUrl !== null).map((post) => (
                      <li key={post.$id} className="flex justify-center w-full">
                      <VideoPostCard post={post} key={post.caption}/>
                    </li>
                    ))}
                </ul>
              )}
          </TabsContent>
          </Tabs>
        </div>
    </div>
    </>
  )
};

export default Home