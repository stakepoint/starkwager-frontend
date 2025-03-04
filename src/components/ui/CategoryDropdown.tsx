"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react"; // Importamos el icono correcto
import Image from "next/image";
import { ChevronDown } from "lucide-react"; // Usando el mismo icono que Add Hashtags

const categories = [
  "Sports",
  "Esports",
  "Politics",
  "Crypto",
  "Stocks",
  "Entertainment",
  "Games",
  "Others"
];

export default function CategoryDropdown({ onSelect }: { onSelect: (category: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full h-18 px-4 bg-accent-100 rounded-md flex justify-between items-center 
          text-blue-950 font-medium shadow-none border-none min-w-[320px] max-w-[380px]"
          className="w-full h-18 px-4 bg-accent-100 rounded-md flex justify-between items-center 
          text-blue-950 font-medium shadow-none border-none min-w-[320px] max-w-[380px]" 
        >
          {selectedCategory ? selectedCategory : "Select Category"}
          <ChevronDown className="w-4 h-4 text-blue-950" /> {/* Ícono igual al de Add Hashtags */}
          <ChevronDown className="h-5 w-5 text-blue-950" />  {/* Nuevo icono aquí */}
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-center text-[#1E2875]">
            Select Category
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center">
          {categories.map((category, index) => (
            <div key={category} className="w-full flex flex-col items-center">
              <button
                className="py-4 text-lg text-center w-full flex justify-center items-center hover:bg-[#1E2875]/10 font-sans"
                onClick={() => {
                  setSelectedCategory(category);
                  onSelect(category);

                  setTimeout(() => {
                    setIsOpen(false);
                  }, 100);
                }}
              >
                <span className={selectedCategory === category ? "text-[#1E2875] font-bold" : "text-blue-950"}>
                  {category}
                </span>

                {selectedCategory === category && (
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
