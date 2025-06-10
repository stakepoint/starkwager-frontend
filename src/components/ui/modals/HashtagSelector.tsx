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
import { useQuery } from "@tanstack/react-query";
import { wagerService } from "@/services/api/wagerService";

export interface WagerHashtag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface HashtagSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTags: WagerHashtag[];
  onTagsChange: (tags: WagerHashtag[]) => void;
}

export function HashtagSelector({
  open,
  onOpenChange,
  selectedTags,
  onTagsChange,
}: HashtagSelectorProps) {
  const toggleTag = (tag: WagerHashtag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id));
    } else if (selectedTags.length < 4) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const { data: hashtags } = useQuery({
    queryKey: ["wagerHashtags"],
    queryFn: wagerService.getAllHashtags,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

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
          {hashtags?.map((tag: WagerHashtag) => (
            <Button
              key={tag.id}
              variant={
                selectedTags.some((t) => t.id === tag.id)
                  ? "default"
                  : "outline"
              }
              onClick={() => toggleTag(tag)}
              className={`flex items-center justify-start gap-2 rounded-full ${
                selectedTags.some((t) => t.id === tag.id)
                  ? "bg-blue-1 text-white dark:text-blue-1 hover:bg-[#1E2875]/90 dark:bg-secondary"
                  : "hover:bg-[#1E2875]/10 dark:bg-grey-9"
              }`}
              disabled={
                !selectedTags.some((t) => t.id === tag.id) &&
                selectedTags.length >= 4
              }
            >
              <Hash
                className={`h-5 w-5 p-1 rounded ${
                  selectedTags.some((t) => t.id === tag.id)
                    ? "dark:bg-blue-1 dark:text-secondary bg-white text-blue-1"
                    : "bg-blue-1 text-white dark:bg-white dark:text-blue-1"
                }`}
              />
              {tag.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
