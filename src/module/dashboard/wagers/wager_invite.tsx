'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSvgById } from '@/svgs';

export default function WagerInvite() {
  return (
    <section className='mx-auto py-[2rem] pb-24 lg:py-[4rem] max-w-lg'>
      <div>
        {/* Title */}
        <h1 className=' text-blue-950 dark:text-white text-lg lg:text-2xl tracking-tight font-semibold'>
          WAGER CREATED
        </h1>
        <p className='text-[#4A5578] dark:text-[#6C737F] tracking-tight'>
          Your wager has been created, send wager invite 🚀
        </p>
        <div className='w-full h-[1px] bg-[#E2E5EB] dark:bg-[#1F2A37]  my-6 '></div>

        <section className='grid gap-4'>
          <div>
            <label className='text-sm text-blue-950 dark:text-[#6C737F] tracking-tighter'>
              Invite through username
            </label>
            <Input
              id='title'
              className=' h-14 rounded-[12px] border-none bg-accent-100 dark:bg-dark-input-bg placeholder:text-[#B9C0D4] shadow-none focus:ring-0  mt-1 outline-none'
              placeholder='wager.strk/'
            />
          </div>

          <div className='gap-3'>
            <p className='text-sm font-medium text-[#102A56] dark:text-[#6C737F] tracking-tighter'>
              Invite publicly (Anyone with this link can join it)
            </p>
            <div className='mt-1 flex items-center bg-[#EFF1F5] dark:bg-dark-input-bg rounded-lg px-4 py-6 h-[72px] relative'>
              <div className='gap-1 h-5 flex'>
                <input
                  type='text'
                  readOnly
                  value='https://link.wager.strk/WEpl'
                  className='flex-1 bg-transparent text-gray-800 dark:text-white  outline-none'
                />
                <div
                  className=' absolute right-0 top-0 rounded-r-lg bg-[#E0FE10] p-6 text-lime-800 hover:bg-[#E0FE10] transition-colors h-[72px] w-[72px]'
                  aria-label='Copy link'
                >
                  {getSvgById('copy_icon', { className: '' })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='flex pt-10 w-full flex-col gap-2'>
        <Button className='text-base'>Send Wager</Button>
        <Button
          variant='outline'
          className='text-base dark:text-black dark:bg-white'
        >
          Back Home
        </Button>
      </div>
    </section>
  );
}
