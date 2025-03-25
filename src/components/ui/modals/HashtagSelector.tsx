'use client';

import { Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const HASHTAGS = [
  'Bitcoin',
  'STRKBet',
  'BTCto100k',
  'CryptoBetting',
  'BlockchainWager',
  'CryptoTrends',
  'Web3Challenge',
  'ETH',
  'DeFiPrediction',
];

interface HashtagSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function HashtagSelector({
  open,
  onOpenChange,
  selectedTags,
  onTagsChange,
}: HashtagSelectorProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 4) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4 dark:bg-[#1F2A37]'>
        <DialogHeader className=''>
          <DialogTitle className='text-xl font-semibold flex items-center justify-center text-[#1E2875] dark:text-white'>
            Add Hashtag(s)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-center text-[#1E2875] pb-4 dark:text-white'>
          Hashtags helps other users find your wager easily and quickly.
        </DialogDescription>
        <div className='grid grid-cols-2 gap-2'>
          {HASHTAGS.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              onClick={() => toggleTag(tag)}
              className={`flex items-center justify-start gap-2 ${
                selectedTags.includes(tag)
                  ? 'bg-[#1E2875] dark:!bg-primary  text-white dark:text-blue-1 hover:bg-[#1E2875]/90'
                  : 'hover:bg-[#1E2875]/10 dark:hover:bg-white/10 dark:bg-[#111927]'
              }`}
              disabled={!selectedTags.includes(tag) && selectedTags.length >= 4}
            >
              <Hash className='h-4 w-4' />
              {tag}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
