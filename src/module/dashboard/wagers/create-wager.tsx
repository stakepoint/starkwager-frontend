'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { HashtagSelector } from '@/components/ui/modals/HashtagSelector';
import CategoryDropdown from '@/components/ui/CategoryDropdown';

export default function CreateWager() {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [terms, setTerms] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 1000) {
      setTerms(e.target.value);
    }
  };

  return (
    <div className='w-full max-w-xl py-[4rem] mx-auto '>
      <form className='flex flex-col gap-5'>
        <div className='flex gap-3'>
          <CategoryDropdown onSelect={(category) => console.log(category)} />

          <Select>
            <SelectTrigger
              className='dark:bg-dark-input-bg dark:text-white'
              onClick={() => setOpen(true)}
            >
              <SelectValue placeholder='Add Hashtags' className='flex-grow ' />
            </SelectTrigger>
          </Select>

          <HashtagSelector
            open={open}
            onOpenChange={setOpen}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>

        <div>
          <div className='mt-3'>
            <label
              htmlFor='title'
              className='text-sm tracking-tight text-blue-1 dark:text-white font-medium mb-3'
            >
              Title of your wager
            </label>
            <Input
              id='title'
              value={title}
              onChange={handleTitleChange}
              maxLength={50}
              className='h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-3 outline-none dark:bg-dark-input-bg'
              placeholder='wager.strk/'
            />
          </div>
          <span className='flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]'>
            {title.length}/50
          </span>
        </div>

        <div>
          <div>
            <label
              htmlFor='terms'
              className='text-sm tracking-tight text-blue-1 dark:text-white font-medium'
            >
              Terms or Wager Description
            </label>
            <Input
              id='terms'
              value={terms}
              onChange={handleTermsChange}
              maxLength={1000}
              className='h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-1 outline-none dark:bg-dark-input-bg'
              placeholder='wager.strk/'
            />
          </div>
          <span className='flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]'>
            {terms.length}/1000
          </span>
        </div>

        <div>
          <div>
            <label
              htmlFor='stake'
              className='text-sm tracking-tight text-blue-1 dark:text-white font-medium'
            >
              Stake
            </label>
            <Input
              id='stake'
              className='h-14 rounded-[12px] border-none bg-accent-100 placeholder:text-[#B9C0D4] dark:placeholder:text-[#6C737F] shadow-none focus:ring-0 mt-1 outline-none dark:bg-dark-input-bg'
              placeholder='0 Strk'
            />
          </div>
          <span className='flex justify-end text-sm py-2 text-gray-400 dark:text-[#B9C0D4]'>
            You have 50.00 Strk
          </span>
        </div>

        <div className='flex justify-center pt-5'>
          <Button className='w-full max-w-[384px] text-lg font-medium tracking-[-0.36px]'>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
