"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const categories = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Esports" },
  { id: 3, name: "Politics" },
  { id: 4, name: "Crypto" },
  { id: 5, name: "Stocks" },
  { id: 6, name: "Entertainment" },
  { id: 7, name: "Games" },
  { id: 8, name: "Others" }
];

export default function CategoryDropdown({ onSelect }: { onSelect: (category: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full h-14 px-4 bg-white border border-gray-300 rounded-md text-center flex justify-between items-center 
          text-blue-1 font-medium shadow-sm focus:outline-none"
        >
          {selectedCategory ? selectedCategory : "Select Category"}
          <span className="text-gray-500">▼</span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-md mx-auto rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-blue-950 font-sans">
            Select Category
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center"> 
          {categories.map((category, index) => (
            <div key={category.id} className="w-full flex flex-col items-center">
              <button
                className="py-4 text-lg text-center w-full flex justify-center items-center hover:bg-gray-100 font-sans"
                onClick={() => {
                  setSelectedCategory(category.name);
                  onSelect(category.name);
                  
                  setTimeout(() => {
                    setIsOpen(false);
                  }, 30); 
                }}
              >
                <span className={selectedCategory === category.name ? "text-blue-600 font-bold" : "text-blue-950"}>
                  {category.name}
                </span>

                {selectedCategory === category.name && (
                  <Image src="/images/Container.svg" alt="Selected" width={20} height={20} className="ml-2" />
                )}
              </button>

              {index < categories.length - 1 && (
                <div className="flex justify-center">
                  <Image src="/images/Divider.svg" alt="Divider" width={352} height={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
