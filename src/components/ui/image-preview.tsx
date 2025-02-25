"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import avatar from "/public/images/avatar.svg";
import { Camera } from "lucide-react";

interface ImagePreviewProps {
  setSelectedImage: any;
  image?: string;
}

interface HandleImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

function ImagePreview({ setSelectedImage, image }: ImagePreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: HandleImageChangeEvent) => {
    const file: FileList | null = e.target.files;
    setSelectedImage(file);
    if (file) {
      const imageUrl: string = URL.createObjectURL(file[0]);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center gap-3 h-[100px] w-[100px] rounded-lg border-none relative">
      <Image
        src={selectedImageUrl || image || avatar} // Use selectedImageUrl if it exists, else use image prop(user's current image), else use avatar
        alt=""
        className="rounded-lg object-cover h-[100px] w-[100px]"
        width={100}
        height={100}
      />

      <div className="absolute h-full w-full left-0 cursor-pointer top-0 rounded-lg flex items-end p-[1rem] justify-center">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="bg-[#DAEBFF] rounded-md border-none text-sm hidden"
        />
      </div>

      <div
        onClick={handleIconClick}
        className="absolute bottom-0 right-0 cursor-pointer p-1.5 bg-white rounded-full"
      >
        <Camera size={18} />
      </div>
    </div>
  );
}

export default ImagePreview;
