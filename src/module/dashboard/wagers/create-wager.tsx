import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getSvgById } from "@/svgs";

export default function CreateWager() {
  return (
    <div className="w-full max-w-xl py-[4rem]  mx-auto">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" className="text-blue-1 font-medium" />
            </SelectTrigger>
            <SelectContent className="border-none text-blue-950">
              <SelectItem value="category1">Category 1</SelectItem>
              <SelectItem value="category2">Category 2</SelectItem>
              <SelectItem value="category3">Category 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-shrink-0 absolute right-1 ml-2">
            {getSvgById("arrowDown", {
              className: "w-4 h-4",
            })}
          </div>

          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Add Hashtags" className="flex-grow " />
            </SelectTrigger>
            <SelectContent className="border-none text-blue-950">
              <SelectItem value="tag1">Tag 1</SelectItem>
              <SelectItem value="tag2">Tag 2</SelectItem>
              <SelectItem value="tag3">Tag 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-shrink-0 absolute right-1 ml-2">
            {getSvgById("arrowDown", {
              className: "w-4 h-4",
            })}
          </div>
        </div>

        {/* Title of wager field */}
        <div>
          <div className="mt-3">
            <label
              htmlFor="title"
              className="text-sm tracking-tight text-blue-1 font-medium mb-3"
            >
              Title of your wager
            </label>

            <Input
              id="title"
              className=" h-14 rounded-[12px]  border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-3 outline-none"
              placeholder="wager.strk/"
            />
          </div>

          <span className="flex justify-end text-sm py-2 text-gray-400">
            0/50
          </span>
        </div>

        {/* Description of wager field */}
        <div>
          <div>
            <label
              htmlFor="terms"
              className="text-sm tracking-tight text-blue-1 font-medium"
            >
              Terms or Wager Description
            </label>

            <Input
              id="terms"
              className=" h-14 rounded-[12px]  border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none"
              placeholder="wager.strk/"
            />
          </div>

          <span className="flex justify-end text-sm py-2 text-gray-400">
            0/1000
          </span>
        </div>

        {/* Strk field */}
        <div>
          <div>
            <label
              htmlFor="stake"
              className="text-sm tracking-tight text-blue-1 font-medium"
            >
              Stake
            </label>

            <Input
              id="stake"
              className=" h-14 rounded-[12px]  border-none bg-accent-100 placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none"
              placeholder="0 Strk"
            />
          </div>

          <span className="flex justify-end text-sm py-2 text-gray-400">
            You have 50.00 Strk
          </span>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-5">
          <Button className="w-full max-w-[384px] text-lg font-medium tracking-[-0.36px]">Continue</Button>
        </div>
      </form>
    </div>
  );
}
