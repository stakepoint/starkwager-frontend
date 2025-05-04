import { byteArray, type ByteArray, uint256 } from "starknet";

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

// Function to convert a string to byte array using starknet's byteArray utility
export const convertToByteArray = (str: string): ByteArray => {
  if (!str) {
    return byteArray.byteArrayFromString("");
  }

  return byteArray.byteArrayFromString(str);
};

type U256Value = { low: bigint; high: bigint };

export const convertToU256 = (num: number | string): U256Value => {
  if (num === "") {
    throw new Error(`Invalid number for U256 conversion: empty string`);
  }

  try {
    const numStr = typeof num === "number" ? num.toString() : num;

    // Assuming the input 'num' is in Ether, convert to Wei (smallest unit)
    // Adjust 10**18 if your input number represents a different denomination
    const amountInWei = BigInt(numStr) * BigInt(10 ** 18);

    // Convert the BigInt amount (in Wei) to the u256 struture { low, high }
    const u256Amount = uint256.bnToUint256(amountInWei);

    return {
      low: BigInt(u256Amount.low),
      high: BigInt(u256Amount.high),
    };
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
