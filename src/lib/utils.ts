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
