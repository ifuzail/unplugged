"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, XCircleIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const StorySlider = ({ stories, user }) => {
  const router = useRouter();
  const [showSlider, setShowSlider] = useState(true);

  const handleCloseSlider = () => {
    setShowSlider(false);
    router.push("/");
  };

  return (
    <section className="p-5 w-full flex justify-center md:mt-0 mt-10 relative">
      <div className="md:w-[500px] ">
        <Carousel
          autoPlay
          interval={7000}
          showStatus={false}
          autoFocus
          selectedItem={0}
          >
          {stories.map((story, index) => (
            <div key={index}>
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
          className="absolute top-3 right-3 w-10 h-10">
          <XCircleIcon />
        </button>
        <Link href={`/profile/${user.id}`}>
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
    </section>
  );
};
