"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

  return (
    <Dialog>
      {/* Botón de Selección de Categoría */}
      <DialogTrigger asChild>
        <button className="w-full h-14 px-4 bg-white border border-gray-300 rounded-md text-left flex justify-between items-center text-blue-1 font-medium shadow-sm">
          {selectedCategory ? selectedCategory : "Select Category"}
          <span className="text-gray-500">▼</span>
        </button>
      </DialogTrigger>

      {/* Modal con Lista de Categorías */}
      <DialogContent className="w-[90%] max-w-md mx-auto rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-blue-950">Select Category</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`py-4 text-lg text-left px-4 border-b hover:bg-gray-100 flex justify-between items-center ${
                selectedCategory === category.name ? "text-blue-600 font-bold" : "text-blue-950"
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                onSelect(category.name);
              }}
            >
              {category.name}
              {selectedCategory === category.name && <span className="text-green-500">✔</span>}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
