"use client";

import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ videoUrl, imageUrl }) => {
  console.log(imageUrl);
  return (
    <div className="flex justify-center items-center relative">
      <ReactPlayer
        light={
          <Image
            width={800}
            height={800}
            src={imageUrl || "/default-video.png"}
            alt="video thumbnail"
            className="w-[640px] h-[360px] object-cover rounded-xl object-top"
          />
        }
        url={videoUrl}
        playing
        controls
        playIcon={
          <MdPlayCircleFilled className="text-7xl absolute top-36 hover:text-zinc-400" />
        }
      />
    </div>
  );
};
