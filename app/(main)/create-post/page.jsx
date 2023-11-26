"use client";

import { VideoPostForm } from "@/components/forms/VideoPostForm";
import { NormalPostForm } from "@/components/forms/NormalPostForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, PencilIcon, Video } from "lucide-react";

const CreatePost = () => {
  return (
    <ScrollArea className="bg-dark-3 container-scroll p-3">
      <div className="flex items-center gap-1 mt-10 justify-start">
        <ImageIcon size={28} />
        <h1 className="h2-bold text-zinc-200">Create a post</h1>
      </div>
      <p className="text-light-3 base-medium mt-4 mb-2">
        Choose which type of post you want to create.
      </p>

      <div className="w-full">
        <Tabs defaultValue="Normal" className="w-full">
          <TabsList>
            <TabsTrigger
              value="Normal"
              className="w-36 flex flex-row items-center gap-1">
              <h3>Normal</h3>
              <PencilIcon size={15} />
            </TabsTrigger>
            <TabsTrigger
              value="Video"
              className="w-36 flex flex-row items-center gap-1">
              <h3>Video</h3>
              <Video size={15} />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Normal">
            <NormalPostForm action="create" />
          </TabsContent>
          <TabsContent value="Video">
            <VideoPostForm action="create" />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default CreatePost;
