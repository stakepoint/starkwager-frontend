export enum ContractCategory {
  SPORTS = 0,
  ESPORTS = 1,
  POLITICS = 2,
  CRYPTO = 3,
  STOCKS = 4,
  ENTERTAINMENT = 5,
  GAMES = 6,
  OTHERS = 7,
}

export enum ContractMode {
  HeadToHead = 0,
  Group = 1,
}

export enum ContractClaim {
  Yes = 0,
  No = 1,
}

// Conversion Functions
export const convertToContractCategory = (category: string): number => {
  const upperCategory = category.toUpperCase();
  const categoryIndex =
    ContractCategory[upperCategory as keyof typeof ContractCategory];
  if (categoryIndex !== undefined) {
    return categoryIndex;
  }
  throw new Error(`Invalid category: ${category}`);
};

// Function to split a string into chunks of max 31 characters
export const convertToByteArray = (str: string): string[] => {
  const CHUNK_SIZE = 31;
  const chunks: string[] = [];
  if (str === null || str === undefined) {
    return chunks; // Return empty array
  }
  for (let i = 0; i < str.length; i += CHUNK_SIZE) {
    chunks.push(str.substring(i, i + CHUNK_SIZE));
  }
  // Return the flat array of strings
  return chunks;
};

export const convertToU256 = (num: number | string): bigint => {
  // Explicit check for empty string input
  if (num === "") {
    throw new Error(`Invalid number for U256 conversion: `);
  }

  try {
    // Ensure input is a string for uint256.bnToUint256
    const numStr = typeof num === "number" ? num.toString() : num;
    // Convert Ether to Wei (assuming input stake is in Ether)
    // StarkNet uses felt for amounts, typically representing the smallest unit (like Wei)
    // If the input 'stake' is already in the smallest unit (e.g., Wei), remove the multiplication
    const amountInWei = BigInt(numStr) * BigInt(10 ** 18); // Adjust 10**18 if using a different denomination
    return amountInWei;
  } catch (error) {
    console.error("Error converting to U256:", error);
    throw new Error(`Invalid number for U256 conversion: ${num}`);
  }
};

export const convertToContractMode = (mode: string): number => {
  const modeIndex = ContractMode[mode as keyof typeof ContractMode];
  if (modeIndex !== undefined) {
    return modeIndex;
  }
  throw new Error(`Invalid mode: ${mode}`);
};

export const convertToContractClaim = (claim: string): number => {
  const claimIndex = ContractClaim[claim as keyof typeof ContractClaim];
  if (claimIndex !== undefined) {
    return claimIndex;
  }

  throw new Error(`Invalid claim: ${claim}`);
};

export const convertToU64 = (dateTime: Date | string | number): bigint => {
  try {
    const date = typeof dateTime === "object" ? dateTime : new Date(dateTime);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }
    // Return timestamp in seconds as bigint
    return BigInt(Math.floor(date.getTime() / 1000));
  } catch (error) {
    console.error("Error converting to U64 timestamp:", error);
    throw new Error(`Invalid date/time for U64 conversion: ${dateTime}`);
  }
};
