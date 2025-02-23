"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white text-center p-6">
      <h1 className="text-3xl font-bold text-blue-1 mt-4">
        <span className="text-[#E0FE10]">Oops!</span> Something Went Wrong
      </h1>
      <p className="text-gray-600 mt-2 text-sm md:text-base">
        An unexpected error occurred. Please try again.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-[#E0FE10] text-[#102A56] rounded-lg hover:bg-[#E0FE10]/50 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
