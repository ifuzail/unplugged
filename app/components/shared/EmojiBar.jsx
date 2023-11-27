"use client"

import EmojiPicker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";


export const EmojiBar = ({onChange}) => {
  return (
    <Popover>
      <PopoverTrigger >
        <Smile
          className="text-zinc-500  hover:text-zinc-600 transition"
        />
      </PopoverTrigger>
      <PopoverContent 
        side="top"
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <EmojiPicker
          data={data}
          onEmojiSelect={(emoji) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
};