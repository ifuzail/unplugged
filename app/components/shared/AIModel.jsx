"use client";

import { BsRobot } from "react-icons/bs";
import { AiChatInput } from "./AiChatInput";

export const AIModel = () => {
  
  return (
    <section className="flex flex-col h-screen justify-between p-2">
      <div className="p-5 flex flex-col gap-4 custom-scrollbar overflow-y-auto">
        <div className="flex flex-row gap-2">
          <BsRobot fontSize={20} />
          <h1>UnpluggedA!</h1>
        </div>
        <hr className="border border-light-2/30 w-full mb-5 " />
        <div className="flex flex-row justify-start items-center gap-2">
          <button className="shad-button_ai">
            <BsRobot fontSize={24} />
          </button>
          <p className="bg-dark-3 p-4 small-regular text-light-2 rounded-lg">
            Hi! I'm unplugged Ai.
          </p>
        </div>
        <div className="flex flex-row justify-end items-center gap-2">
          <p className="bg-dark-3 p-4 small-regular text-light-2 rounded-lg">
            Hi! I'm user.
          </p>
          <button className="shad-button_ai">user</button>
        </div>
      </div>
      <AiChatInput />
    </section>
  );
};
