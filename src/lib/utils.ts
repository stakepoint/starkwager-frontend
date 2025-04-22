import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPageTitle = (path: string) => {
  switch (path) {
    case "/dashboard":
      return "HOME";
    case "/dashboard/wagers":
      return "WAGERS";
    case "/dashboard/wagers/wagers_summary":
      return "WAGER SUMMARY";
    case "/dashboard/wallet":
      return "WALLET";
    case "/dashboard/profile":
      return "PROFILE";
    case "/dashboard/create-wager":
      return "CREATE WAGER";
    case "/dashboard/profile/setting":
      return "ACCOUNT SETTINGS";
    default:
      return "HOME";
  }
};

export const addressShortner = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};
