"use client"

import { useInView } from "react-intersection-observer"

interface RoleWordProps {
  word: string
}

export function RoleWord({ word }: RoleWordProps) {

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  })

  return (
    <span
      ref={ref}
      className={`role h-full pl-[6px] transition-all duration-500 ${
        inView
          ? "text-white"
          : "bg-gradient-to-t from-white via-[#16182B] via-80% to-[#16182B00] to-90% bg-clip-text text-transparent"
      }`}
    >
      {word}
    </span>
  )
}
