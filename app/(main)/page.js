"use client"

import { VideoPostCard } from "@/components/cards/VideoPostCard";
import { PostCard } from "@/components/cards/PostCard";
import Loader from "@/components/loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutation"

const Home = () => {

  const {data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts();

  return (
    <div className="h-[100vh] overflow-y-scroll custom-scrollbar">
        <div className="p-5">
            <h2 className="font-bold text-left w-full md:text-3xl text-2xl mb-5">Home Feed</h2>
          <Tabs defaultValue="normal" className="mt-2 mb-3">
              <TabsList className='w-full bg-zinc-800'>
                <TabsTrigger value='normal' className='w-full'>Normal</TabsTrigger>
                <TabsTrigger value='video' className='w-full'>Video</TabsTrigger>
              </TabsList>
         
          <TabsContent value='normal'>
              {isPostLoading && !posts ? (
                <Loader/>
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full mt-5">
                    {posts?.documents.filter((post) => post.videoUrl === null).map((post) => (
                      <li key={post.$id} className="flex justify-center w-full">
                      <PostCard post={post} key={post.caption}/>
                    </li>
                    ))}
                </ul>
              )}
          </TabsContent>
          <TabsContent value='video'>
              {isPostLoading && !posts ? (
                <Loader/>
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
  )
};

export default Home