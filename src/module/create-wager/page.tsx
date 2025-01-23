import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export default function CreateWager() {
  return (
    <div>
      {/* <DashboardNavbar /> */}
      <div className='flex justify-center p-5 mt-10 items-center'>
        <form className='text-[#102A56] w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mx-auto'>
          <div className='grid grid-cols-2 gap-3 mb-5'>
            {/*Select category field*/}
            <div className='flex items-center  py-5 px-3 bg-[#EFF1F5] justify-between rounded-sm'>
              <h3 className='md:text-sm text-[.75rem] text-[#102A56]'>
                Select Category
              </h3>
              <TiArrowSortedDown className='cursor-pointer text-md' />
            </div>

            {/*Select Add Hash tags field*/}
            <div className='flex items-center bg-[#EFF1F5] px-3 py-5 rounded-sm justify-between'>
              <h3 className='md:text-sm text-[.75rem]'>Add HashTags</h3>
              <TiArrowSortedDown className='cursor-pointer text-lg' />
            </div>
          </div>

          {/*Title of Wager field*/}
          <div className='mt-2'>
            <label htmlFor='title' className='text-[.75rem]'>
              Title of your Wager
            </label>
            <div className='bg-[#EFF1F5] px-2 py-[.3125rem] mb-2 rounded-sm justify-center'>
              <input
                type='text'
                placeholder='wager.strk/'
                className='outline-none w-full placeholder:text-sm py-[.8125rem] placeholder:text-[#B9C0D4] bg-transparent px-2'
              />
            </div>
            <span className='flex justify-end text-[.75rem] text-[#7D89B0]'>
              0/50
            </span>
          </div>

          {/*Terms of Wager field*/}
          <div className='mt-2'>
            <label htmlFor='terms' className='text-[.75rem]'>
              Terms or Wager Description
            </label>
            <div className='bg-[#EFF1F5] px-2 py-[.3125rem] mb-2 rounded-sm justify-center'>
              <input
                type='text'
                placeholder='wager.strk/'
                className='outline-none w-full placeholder:text-sm py-[.8125rem] placeholder:text-[#B9C0D4] bg-transparent px-2'
              />
            </div>
            <span className='flex justify-end text-[.75rem] text-[#7D89B0]'>
              0/1000
            </span>
          </div>

          {/*Stake field*/}
          <div className='mt-2'>
            <label htmlFor='stake' className='text-[.75rem]'>
              Stake
            </label>
            <div className='bg-[#EFF1F5] flex items-center px-2 py-[.3125rem] rounded-sm mb-2 justify-center'>
              <input
                type='text'
                placeholder='0Strk'
                className='outline-none w-full placeholder:text-sm py-[.8125rem] placeholder:text-[#B9C0D4] bg-transparent px-2'
              />
              <span>
                <p className='text-[#B9C0D4] pr-2'>$0</p>
              </span>
            </div>
            <span className='flex justify-end text-[.75rem] text-[#7D89B0]'>
              You have 50.00 Strk
            </span>
          </div>

          {/*Submit Button*/}
          <div className='mt-4 flex justify-center'>
            <button
              type='submit'
              className='bg-[#E0FE10] text-[#102A56] py-3 px-28 rounded-md'
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
