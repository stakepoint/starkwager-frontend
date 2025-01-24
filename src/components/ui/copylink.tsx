import * as React from "react"
import { getSvgById } from "@/svgs";

import { cn } from "@/lib/utils"

const CopyLink = React.forwardRef<HTMLInputElement, {text: string} & React.ComponentProps<"input">>(
  ({ className, text, ...props }, ref) => {
    const copyValue = async () => {
        try {
          
          await navigator.clipboard.writeText(text);
          alert('copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    }
    return (
    <div className="overflow-hidden flex rounded-sm h-18 w-full">
        <input
            type="text"
            className={cn(
            "flex flex-grow h-18 bg-[#EFF1F5] px-3 py-2 text-lg text-[#102A56] shadow-sm transition-colors",
            className
            )}
            ref={ref}
            value={text}
            disabled
            {...props}
        />
        <button className="w-50 h-full flex items-center justify-center cursor-pointer p-4 lg:p-6 bg-[#E0FE10]" onClick={copyValue}>
            {getSvgById("copy_icon", {
                className: " w-4 h-4 lg:w-6 lg:h-6 ",
            })}
        </button>
      </div>
    )
  }
)
CopyLink.displayName = "CopyLink"

const MiniCopyLink: React.FC<{text: string}> = ({text}) => {
    const copyValue = async () => {
        try {
          
          await navigator.clipboard.writeText(text);
          alert('copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    }
    return (
        <button className="flex cursor-pointer py-1 px-2 rounded-sm bg-white w-auto" onClick={copyValue}>
            <span className="inline-block mr-2 text-base text-[#102A56] text-left">
              {text}
            </span>
            <span>
              {getSvgById("copy_icon_alt", {
                  className: " w-4 h-4 lg:w-6 lg:h-6 ",
              })}
            </span>
        </button>
    )
}

MiniCopyLink.displayName = "AvatarCopyLink"

export { CopyLink, MiniCopyLink }