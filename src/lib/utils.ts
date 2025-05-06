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
  return `${address.slice(0, 7)}...${address.slice(-3)}`;
};

export function formatBalance(balance: string | number) {
  try {
    let balanceNum: number;
    // Convert the balance string to a number
    if (typeof balance === 'string') {
      balanceNum = parseFloat(balance);
      
      // Check if the number is valid
      if (isNaN(balanceNum)) {
        return '0.00';
      }
      
      // Format the number with 2 decimal places
      return balanceNum.toFixed(2);
    } else if (typeof balance === 'number') {
      // If it's already a number, format it directly
      return balance.toFixed(2);
    }
  } catch (error) {
    console.error('Error formatting balance:', error);
    return '0.00';
  }
}
