"use client";

import { Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HASHTAGS = [
  "Bitcoin",
  "BTCto100k",
  "BlockchainWager",
  "STRKBet",
  "CryptoTrends",
  "Web3Challenge",
  "ETH",
  "DeFiPrediction",
  "CryptoBetting",
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
      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4 dark:bg-grey-8">
        <DialogHeader className="">
          <DialogTitle className="text-xl font-semibold flex items-center justify-center text-[#1E2875] dark:text-white">
            Add Hashtag(s)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-[#1E2875] pb-4 dark:text-white">
          Hashtags helps other users find your wager easily and quickly.
        </DialogDescription>
        <div className="flex flex-wrap gap-3">
          {HASHTAGS.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => toggleTag(tag)}
              className={`flex items-center justify-start gap-2 rounded-full ${
                selectedTags.includes(tag)
                  ? "bg-blue-1 text-white dark:text-blue-1 hover:bg-[#1E2875]/90 dark:bg-secondary"
                  : "hover:bg-[#1E2875]/10 dark:bg-grey-9"
              }`}
              disabled={!selectedTags.includes(tag) && selectedTags.length >= 4}
            >
              <Hash
                className={`h-5 w-5 p-1 rounded ${
                  selectedTags.includes(tag)
                    ? "dark:bg-blue-1 dark:text-secondary bg-white text-blue-1"
                    : "bg-blue-1 text-white dark:bg-white dark:text-blue-1"
                }`}
              />
              {tag}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
