"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { wagerService } from "@/services/api/wagerService";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryDropdown({
  onSelect,
}: {
  onSelect: (category: { id: string; name: string }) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["wagerCategories"],
    queryFn: wagerService.getAllCategories,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // Sort categories so that 'Others' is always at the bottom
  const sortedCategories = categories
    ? [...categories].sort((a, b) => {
        if (a.name === "Others") return 1;
        if (b.name === "Others") return -1;
        return 0;
      })
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full h-[72px] px-4 bg-accent-100 rounded-md flex justify-between items-center 
  text-blue-950 font-normal text-sm shadow-none border-none md:min-w-[320px] max-w-[380px] dark:bg-grey-8 dark:text-white"
        >
          {selectedCategory ? selectedCategory : "Select Category"}
          <ChevronDown className="h-6 w-6 text-blue-950 dark:text-white" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4 dark:bg-grey-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-center text-[#1E2875] dark:text-white">
            Select Category
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-primary">Loading categories...</p>
            </div>
          ) : (
            sortedCategories?.map((category: Category, index: number) => (
              <div
                key={category.id}
                className="w-full flex flex-col items-center"
              >
                <button
                  className="py-4 text-lg text-center w-full flex justify-center items-center hover:bg-[#1E2875]/10 dark:hover:bg-white/5 font-sans"
                  onClick={() => {
                    setSelectedCategory(category?.name);
                    onSelect({ id: category?.id, name: category?.name });

                    setTimeout(() => {
                      setIsOpen(false);
                    }, 100);
                  }}
                >
                  <span
                    className={
                      selectedCategory === category.name
                        ? "text-[#1E2875] dark:text-white font-bold"
                        : "text-blue-950 dark:text-white"
                    }
                  >
                    {category.name}
                  </span>

                  {selectedCategory === category.name && (
                    <Image
                      src="/images/Container.svg"
                      alt="Selected"
                      width={20}
                      height={20}
                      className="ml-2"
                    />
                  )}
                </button>

                {index < (sortedCategories?.length || 0) - 1 && (
                  <div className="flex justify-center">
                    <Image
                      src="/images/Divider.svg"
                      alt="Divider"
                      width={352}
                      height={16}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/DividerDark.svg"
                      alt="Divider"
                      width={352}
                      height={16}
                      className="dark:block hidden"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
