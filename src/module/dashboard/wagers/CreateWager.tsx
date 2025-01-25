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
    <div className='w-full max-w-md mx-auto '>
      <form className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4'>
        <div className='grid gap-3 grid-cols-2'>
          {/* Select Category  field*/}
          <div className='bg-[#EFF1F5] relative flex items-center justify-between py-2 rounded-sm px-2'>
            <Select>
              <SelectTrigger className='border-none text-[12px] focus:ring-0 flex items-center w-full'>
                <SelectValue
                  placeholder='Select Category'
                  className='flex-grow '
                />
              </SelectTrigger>
              <SelectContent className='border-none'>
                <SelectItem value='category1'>Category 1</SelectItem>
                <SelectItem value='category2'>Category 2</SelectItem>
                <SelectItem value='category3'>Category 3</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex-shrink-0 absolute right-1 ml-2'>
              {getSvgById("arrowDown", {
                className: "w-4 h-4",
              })}
            </div>
          </div>

          {/* Add Hashtags field*/}
          <div className='bg-[#EFF1F5] relative flex items-center justify-between py-2 rounded-sm px-2'>
            <Select>
              <SelectTrigger className='border-none text-[12px] focus:ring-0 flex items-center w-full'>
                <SelectValue
                  placeholder='Add Hashtags'
                  className='flex-grow '
                />
              </SelectTrigger>
              <SelectContent className='border-none'>
                <SelectItem value='tag1'>Tag 1</SelectItem>
                <SelectItem value='tag2'>Tag 2</SelectItem>
                <SelectItem value='tag3'>Tag 3</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex-shrink-0 absolute right-1 ml-2'>
              {getSvgById("arrowDown", {
                className: "w-4 h-4", // Adjusted sizing for mobile view
              })}
            </div>
          </div>
        </div>

        {/* Title of wager field */}
        <div>
          <div className='mt-3'>
            <label htmlFor='title' className='text-sm'>
              Title of your wager
            </label>
            <div className='bg-[#EFF1F5] py-2 mt-1 rounded-sm'>
              <Input
                id='title'
                className='border-none bg-transparent placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none'
                placeholder='wager.strk/'
              />
            </div>
          </div>

          <span className='flex justify-end text-sm py-2 text-gray-400'>
            0/50
          </span>
        </div>

        {/* Description of wager field */}
        <div>
          <div className='mt-3'>
            <label htmlFor='terms' className='text-sm'>
              Terms or Wager Description
            </label>
            <div className='bg-[#EFF1F5] py-2 mt-1 rounded-sm'>
              <Input
                id='terms'
                className='border-none bg-transparent placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none'
                placeholder='wager.strk/'
              />
            </div>
          </div>

          <span className='flex justify-end text-sm py-2 text-gray-400'>
            0/1000
          </span>
        </div>

        {/* Strk field */}
        <div>
          <div className='mt-3'>
            <label htmlFor='stake' className='text-sm'>
              Stake
            </label>
            <div className='bg-[#EFF1F5] py-2 mt-1 rounded-sm flex items-center'>
              <span className="ml-2">
                {getSvgById("starkIcon", {
                  className: "w-4 h-4  ",
                })}
              </span>

              <Input
                id='stake'
                className='border-none bg-transparent placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none'
                placeholder='0 Strk'
              />

              <div>
                <p className='px-3'>$0</p>
              </div>
            </div>
          </div>

          <span className='flex justify-end text-sm py-2 text-gray-400'>
            You have 50.00 Strk
          </span>
        </div>

        {/* Continue Button */}
        <div className='flex justify-center mt-5 mb-20'>
          <Button
            size={"lg"}
            className=' bg-[#E0FE10] hover:bg-[#E4FE36] text-[#102A56] w-full md:w-[70%] '
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
