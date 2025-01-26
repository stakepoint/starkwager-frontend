"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function SetupPage() {
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-col w-full pt-[5rem] items-center justify-center">
      <div className="text-primary w-full max-w-sm flex flex-col gap-6">
        <div className="">
          <h1 className="text-3xl font-semibold tracking-tight text-blue-950">
            SET UP YOUR PROFILE
          </h1>
          <p className="mt-2 text-blue-950 tracking-tighter">
            Choose your picture and a unique username other users can use to
            invite you to wagers
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>
        <div className="flex items-center justify-center bg-blue-950 rounded-3xl bg-primary w-20 h-20 relative">
          <p className="text-4xl text-white font-medium">N</p>
          <div className="absolute bottom-0 right-0 rounded-full p-2 bg-white">
            <Camera size="16" className="text-blue-950" />
          </div>
        </div>
        <Input
          type="text"
          placeholder="wager.strk/@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="secondary"
          className="font-medium text-xl tracking-[-2%] h-14 rounded-2xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
