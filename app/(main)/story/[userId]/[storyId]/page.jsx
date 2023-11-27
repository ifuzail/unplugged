"use client";

import { Loading } from "@/app/components/shared/Loading";
import { Button } from "@/app/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteStory,
  useGetStoryById,
} from "@/lib/react-query/queryAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

const StoryDetails = () => {
  const { user } = useUserContext();
  const { storyId } = useParams();
  const router = useRouter();
  const { data: story, isPending: isloadingStory } = useGetStoryById(
    storyId || ""
  );
  const { mutateAsync: deleteStory } = useDeleteStory();

  const handleDeleteStory = async () => {
    try {
      const deletedStory = await deleteStory({
        story,
        storyId: story.$id,
        imageId: story?.imageId,
      });

      if (deletedStory && deletedStory.status === "ok") {
        router.push(`/profile/${story?.user?.$id}`);
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto h-screen no-scrollbar">
      {isloadingStory ? (
        <Loading />
      ) : (
        <div className="md:h-[500px] md:w-[500px] p-7">
          <Image
            priority
            src={story?.imageUrl}
            width={500}
            height={500}
            alt="story-details"
            className="rounded-[24px] object-cover mb-5 w-full h-[500px] object-top"
          />
          <div className="flex flex-row justify-between gap-5 px-5">
            <Link
              href={`/profile/${story?.user?.$id}`}
              className="flex flex-row gap-3">
              <Image
                width={500}
                height={500}
                src={story?.user?.imageUrl || "/default-user.png"}
                alt="creator"
                className="rounded-full w-12 h-12 object-cover object-top"
              />
              <div className="flex flex-col">
                <p className="font-bold">{story?.user?.name}</p>
                <div className="flex items-center gap-2 text-zinc-400 font-semibold ">
                  <p>{multiFormatDateString(story.$createdAt)}</p>
                </div>
              </div>
            </Link>
            <div className="flex flex-row items-center gap-3">
              <Button
                onClick={handleDeleteStory}
                type="button"
                className={user.id !== story?.user.$id && "hidden"}>
                <Trash className="w-5 h-5 text-red " />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StoryDetails;
