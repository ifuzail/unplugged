"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircle, Trash, XCircleIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export const StorySlider = ({ stories, user }) => {
  const router = useRouter();

  const [showSlider, setShowSlider] = useState(true);

  const handleCloseSlider = () => {
    setShowSlider(false);
    router.push("/");
  };

 

  return (
    <section className="p-5 w-full flex justify-center md:mt-0 mt-10 relative">
      {stories?.length === 0 ? (
       <div className="flex flex-col justify-center items-center absolute top-44">
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
      <div className="md:w-[500px] ">
        <Carousel
          autoPlay
          interval={7000}
          showStatus={false}
          autoFocus
          selectedItem={0}
          showThumbs={false}
          >
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Image
                src={story.imageUrl}
                width={600}
                height={600}
                alt={`story-${index}`}
                className="md:w-56 w-28 max-h-screen object-cover object-top"
              />
            </div>
          ))}
        </Carousel>

        <button
          onClick={handleCloseSlider}
          className="absolute md:top-3 top-1 md:right-3 right-1 w-10 h-10">
          <XCircleIcon />
        </button>
        <Link href={`/profile/${user.$id}`}>
          <div className="absolute top-5 flex flex-row items-center gap-2 px-5 py-3 bg-zinc-900 rounded-r-full">
            <Image
              src={user?.imageUrl}
              width={500}
              height={500}
              alt="profile-image"
              className="w-16 h-16 rounded-full object-cover object-top"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-lg font-bold text-zinc-200">{user?.name}</h2>
              <p className="text-xs font-normal text-zinc-400">
                @{user?.username}
              </p>
            </div>
          </div>
        </Link>
      </div>
      )}
    </section>
  );
};
