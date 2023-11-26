"use client";

import { FollowButton } from "@/components/shared/FollowButton";
import { GridPostList } from "@/components/shared/GridPostList";
import { Loading } from "@/components/shared/Loading";
import { StoryList } from "@/components/shared/StoryList";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useGetUsers,
} from "@/lib/react-query/queryAndMutation";
import { Edit2Icon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const StatsBlock = ({ value, label }) => (
  <div className="flex justify-center items-center flex-col">
    <p className="text-small font-normal text-zinc-200">{value}</p>
    <p className="text-small font-semibold text-zinc-100">{label}</p>
  </div>
);

const ProfilePage = () => {
  const { profileId } = useParams();
  const { user } = useUserContext();

  const { data: currentUser } = useGetUserById(profileId || "");
  const { data: allusers } = useGetUsers();

  const currentUserFollowed = allusers?.documents?.filter((user) =>
    user?.followers?.includes(currentUser?.$id)
  );

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    );

  return (
    <section className="flex flex-col  h-[100vh] overflow-y-scroll custom-scrollbar">
      <div className="p-10">
        <div className="flex flex-row items-center justify-between p-5">
          <div className="flex flex-row items-center gap-5 justify-start">
            <Image
              loading="lazy"
              src={currentUser?.imageUrl || "/default-user.png"}
              width={500}
              height={500}
              alt="profile-image"
              className="md:w-28 md:h-28 w-16 h-16 rounded-full object-cover object-top"
            />
            <div className="flex flex-col justify-start items-start">
              <h1 className="md:text-4xl text-xl font-semibold text-zinc-50">
                {currentUser?.name}
              </h1>
              <p className="text-normal font-thin text-zinc-400 mt-2">
                @{currentUser?.username}
              </p>
              <div className={`${user.id !== currentUser?.$id && "hidden"}`}>
                <Link
                  href={`/update-profile/${currentUser?.$id}`}
                  className={`mt-5 h-10 bg-zinc-900 text-zinc-100 px-4 py-2 flex justify-center items-center gap-2 rounded-lg font-normal hover:text-primary-Eleevan ${
                    user.id !== currentUser?.$id && "hidden"
                  }`}>
                  <Edit2Icon className="w-4 h-4" />
                  <p className="flex whitespace-nowrap text-sm">Edit Profile</p>
                </Link>
              </div>
              <div className={`${user.id === profileId && "hidden"}`}>
                <FollowButton currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
        <hr className="border border-zinc-800 w-full mt-5" />
        <div className="flex flex-row space-x-8 justify-center mt-6">
          <StatsBlock value={currentUser?.posts?.length} label="Posts" />
          <StatsBlock
            value={currentUser?.followers?.length}
            label="Followers"
          />
          <StatsBlock value={currentUserFollowed?.length} label="Following" />
        </div>
        <hr className="border border-zinc-800 w-full mt-5" />
        <p className="text-normal text-zinc-200 mt-5">{currentUser?.bio}</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-zinc-200 px-5 mt-5">
          Posts
        </h2>
        <GridPostList posts={currentUser?.posts} showUser={false} />
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-zinc-200 px-5 mt-5">
          Stories
        </h2>
        {currentUser?.stories.length === 0 ? (
          <div className="flex flex-col justify-center items-center mb-5">
            <p className="p-5 text-center text-zinc-400 text-sm">No stories. Please create one.</p>
            <Link href={`/create-story`}>
              <Button 
                variant='secondary'
                className='text-xs'
              >
               <PlusCircle className="w-5 h-5 mr-2"/> Create Story
              </Button>
            </Link>
          </div>
        ) : (
          <StoryList user={currentUser} />
        )}
      </div>
    </section>
  );
};
export default ProfilePage;
