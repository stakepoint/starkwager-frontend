import { getSvgById } from "@/svgs";
import React from "react";

export default function EmptyStateView({
  text = "No Wagers created yet",
}: {
  text?: string;
}) {
  return (
    <div className="bg-[#F9F9FB] flex lg:flex-col gap-5  rounded-3xl p-5 lg:p-14 items-center lg:justify-center w-full lg:text-center">
      {getSvgById("empty_icon", {
        className: " w-16 h-16 lg:w-24 lg:h-24 ",
      })}
      <p className="text-[#7D89B0]">{text}</p>
    </div>
  );
}
