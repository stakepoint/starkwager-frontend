"use client";

import { Button } from "@/components/ui/button";
import ImagePreview from "@/components/ui/image-preview";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  console.log(selectedImage);

  return (
    <div className="mt-5 lg:mt-16 h-[75vh] lg:h-[65vh] w-full flex flex-col items-center justify-around gap-5">
      <div className="flex flex-col items-center gap-5 w-full lg:w-[75%] mx-auto">
        <div className="flex justify-start w-full mb-3">
          <ImagePreview setSelectedImage={setSelectedImage} />
        </div>
        <Input
          className={cn(
            "mx-auto flex flex-grow w-full h-14 bg-[#EFF1F5] px-5 py-2 text-lg disabled:text-[#102A56] shadow-sm transition-colors rounded-sm disabled:opacity-100 outline-none border-none"
          )}
          placeholder="Full name"
        />

        <Input
          className={cn(
            "mx-auto flex flex-grow w-full h-14 bg-[#EFF1F5] px-5 py-2 text-lg disabled:text-[#102A56] shadow-sm transition-colors rounded-sm disabled:opacity-100 outline-none border-none"
          )}
          value={"@noyi24_7"}
          disabled
        />
      </div>

      <Button className="w-full lg:w-[40%] px-5 py-3 rounded-sm bg-secondary text-blue-1 mt-auto">
        Update Changes
      </Button>
    </div>
  );
};

export default Page;
