import * as React from "react";
import { getSvgById } from "@/svgs";
import { toast } from "sonner";

import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const CopyLink = React.forwardRef<
  HTMLInputElement,
  { text: string } & React.ComponentProps<"input">
>(({ text, ...props }, ref) => {
  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="overflow-hidden flex rounded-sm h-18 w-full">
      <Input
        className={cn(
          "flex flex-grow h-18 bg-[#EFF1F5] px-3 py-2 text-lg disabled:text-[#102A56] shadow-sm transition-colors rounded-none disabled:opacity-100 outline-none border-none",
          props.className
        )}
        ref={ref}
        value={text}
        disabled
        {...props}
      />
      <Button
        className="w-50 h-full flex items-center justify-center cursor-pointer p-4 lg:p-6 bg-[#E0FE10] rounded-none"
        onClick={copyValue}
      >
        {getSvgById("copy_icon", {
          className: " w-4 h-4 lg:w-6 lg:h-6 ",
        })}
      </Button>
    </div>
  );
});
CopyLink.displayName = "CopyLink";

const MiniCopyLink: React.FC<{ text: string }> = ({ text }) => {
  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <Button
      className="flex cursor-pointer h-[30px] py-[4px] px-2 rounded-[8px] bg-white w-auto gap-2"
      onClick={copyValue}
    >
      <span className="inline-block text-base text-[#102A56] text-left">
        {text}
      </span>
      <span>
        {getSvgById("copy_icon_alt", {
          className: " w-4 h-4 lg:w-6 lg:h-6 ",
        })}
      </span>
    </Button>
  );
};

MiniCopyLink.displayName = "MiniCopyLink";

export { CopyLink, MiniCopyLink };