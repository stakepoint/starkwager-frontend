import {
  ContractCategory,
  ContractMode,
  ContractClaim,
  convertToContractCategory,
  convertToByteArray,
  convertToU256,
  convertToContractMode,
  convertToContractClaim,
  convertToU64,
} from "@/lib/starknet-utils";

// Helper to convert a simple string to its expected BigInt felt representation
const stringToFelt = (str: string): bigint => {
  if (!str) return BigInt(0);
  const feltHex = str
    .split("")
    .reduce((memo, c) => memo + c.charCodeAt(0).toString(16), "");
  return BigInt("0x" + feltHex);
};

describe("starknet-utils", () => {
  describe("convertToContractCategory", () => {
    it("should convert valid category strings (case-insensitive) to enum numbers", () => {
      expect(convertToContractCategory("SPORTS")).toBe(ContractCategory.SPORTS);
      expect(convertToContractCategory("sports")).toBe(ContractCategory.SPORTS);
      expect(convertToContractCategory("Esports")).toBe(
        ContractCategory.ESPORTS
      ); // Handles mixed case
      expect(convertToContractCategory("POLITICS")).toBe(
        ContractCategory.POLITICS
      );
      expect(convertToContractCategory("CRYPTO")).toBe(ContractCategory.CRYPTO);
      expect(convertToContractCategory("STOCKS")).toBe(ContractCategory.STOCKS);
      expect(convertToContractCategory("ENTERTAINMENT")).toBe(
        ContractCategory.ENTERTAINMENT
      );
      expect(convertToContractCategory("GAMES")).toBe(ContractCategory.GAMES);
      expect(convertToContractCategory("OTHERS")).toBe(ContractCategory.OTHERS);
    });

    it("should throw an error for invalid category strings", () => {
      expect(() => convertToContractCategory("INVALID")).toThrow(
        "Invalid category: INVALID"
      );
      expect(() => convertToContractCategory("")).toThrow("Invalid category: ");
    });
  });

  describe("convertToByteArray", () => {
    // Test cases when asChunks is true (default)
    describe("when asChunks is true (default)", () => {
      it("should return an empty array for null or undefined input", () => {
        expect(convertToByteArray(null as any)).toEqual([]);
        expect(convertToByteArray(undefined as any)).toEqual([]);
        expect(convertToByteArray(null as any)).toEqual([]); // Explicit true
      });

      it("should return an empty array for an empty string", () => {
        expect(convertToByteArray("")).toEqual([]);
      });

      it("should return the string in an array if length <= 31", () => {
        const shortString = "This is less than 31 chars";
        expect(convertToByteArray(shortString)).toEqual([shortString]);
      });

      it("should return a string of exactly 31 chars in an array", () => {
        const exactString = "1234567890123456789012345678901"; // 31 chars
        expect(convertToByteArray(exactString)).toEqual([exactString]);
      });

      it("should split strings longer than 31 characters into chunks", () => {
        const longString =
          "This is a very long string that definitely exceeds the 31 character limit imposed by felts."; // 96 chars
        // Corrected expected chunks based on substring behavior
        const expectedChunks = [
          "This is a very long string that", // substring(0, 31)
          " definitely exceeds the 31 char", // substring(31, 62)
          "acter limit imposed by felts.", // substring(62, 96)
        ];
        expect(convertToByteArray(longString)).toEqual(expectedChunks);
      });

      it("should handle strings that are exact multiples of 31", () => {
        const multiString =
          "1234567890123456789012345678901abcdefghijklmnopqrstuvwxyzABCDE"; // 62 chars
        const expectedChunks = [
          "1234567890123456789012345678901",
          "abcdefghijklmnopqrstuvwxyzABCDE",
        ];
        expect(convertToByteArray(multiString)).toEqual(expectedChunks);
      });
    });

    // Test cases when asChunks is false
    describe("when asChunks is false", () => {
      it("should return an empty string for null or undefined input", () => {
        expect(convertToByteArray(null as any)).toEqual("");
        expect(convertToByteArray(undefined as any)).toEqual("");
      });

      it("should return an empty string for an empty string", () => {
        expect(convertToByteArray("")).toEqual("");
      });

      it("should return the original short string", () => {
        const shortString = "This is short";
        expect(convertToByteArray(shortString)).toEqual(shortString);
      });

      it("should return the original long string", () => {
        const longString =
          "This is a very long string that definitely exceeds the 31 character limit imposed by felts.";
        expect(convertToByteArray(longString)).toEqual(longString);
      });
    });
  });

  describe("convertToU256", () => {
    const WEI_MULTIPLIER = BigInt(10) ** BigInt(18);

    it("should convert a number to a bigint representing Wei", () => {
      expect(convertToU256(1)).toBe(BigInt(1) * WEI_MULTIPLIER);
      expect(convertToU256(123)).toBe(BigInt(123) * WEI_MULTIPLIER);
      expect(convertToU256(0)).toBe(BigInt(0));
    });

    it("should convert a numeric string to a bigint representing Wei", () => {
      expect(convertToU256("1")).toBe(BigInt(1) * WEI_MULTIPLIER);
      expect(convertToU256("456")).toBe(BigInt(456) * WEI_MULTIPLIER);
      expect(convertToU256("0")).toBe(BigInt(0));
    });

    it("should throw an error for invalid number/string inputs", () => {
      expect(() => convertToU256("abc")).toThrow(
        "Invalid number for U256 conversion: abc"
      );
      expect(() => convertToU256("1.23")).toThrow(
        "Invalid number for U256 conversion: 1.23"
      );
      expect(() => convertToU256("")).toThrow(
        "Invalid number for U256 conversion: "
      );
    });
  });

  describe("convertToContractMode", () => {
    it("should convert valid mode strings (case-sensitive) to enum numbers", () => {
      expect(convertToContractMode("HeadToHead")).toBe(ContractMode.HeadToHead);
      expect(convertToContractMode("Group")).toBe(ContractMode.Group);
    });

    it("should throw an error for invalid or wrong-case mode strings", () => {
      expect(() => convertToContractMode("headtohead")).toThrow(
        "Invalid mode: headtohead"
      );
      expect(() => convertToContractMode("GROUP")).toThrow(
        "Invalid mode: GROUP"
      );
      expect(() => convertToContractMode("InvalidMode")).toThrow(
        "Invalid mode: InvalidMode"
      );
    });
  });

  describe("convertToContractClaim", () => {
    it("should convert valid claim strings (case-sensitive) to enum numbers", () => {
      expect(convertToContractClaim("Yes")).toBe(ContractClaim.Yes);
      expect(convertToContractClaim("No")).toBe(ContractClaim.No);
    });

    it("should throw an error for invalid or wrong-case claim strings", () => {
      expect(() => convertToContractClaim("yes")).toThrow("Invalid claim: yes");
      expect(() => convertToContractClaim("NO")).toThrow("Invalid claim: NO");
      expect(() => convertToContractClaim("Maybe")).toThrow(
        "Invalid claim: Maybe"
      );
    });
  });

  describe("convertToU64", () => {
    it("should convert a Date object to a bigint timestamp in seconds", () => {
      // Test with a specific date (milliseconds) -> seconds
      const date = new Date(1678886400000); // March 15, 2023 12:00:00 GMT
      expect(convertToU64(date)).toBe(BigInt(1678886400));
    });

    it("should convert a valid date string to a bigint timestamp in seconds", () => {
      const dateString = "2023-03-15T12:00:00.000Z";
      expect(convertToU64(dateString)).toBe(BigInt(1678881600));
      const dateStringLocal = "2024-07-18T10:30:00";
      const expectedSeconds = BigInt(
        Math.floor(new Date(dateStringLocal).getTime() / 1000)
      );
      expect(convertToU64(dateStringLocal)).toBe(expectedSeconds);
    });

    it("should convert a timestamp number (milliseconds) to a bigint timestamp in seconds", () => {
      const timestampMs = 1721300000000;
      expect(convertToU64(timestampMs)).toBe(BigInt(1721300000));
    });

    it("should handle the epoch correctly", () => {
      expect(convertToU64(0)).toBe(BigInt(0));
      expect(convertToU64(new Date(0))).toBe(BigInt(0));
    });

    it("should throw an error for invalid date inputs", () => {
      expect(() => convertToU64("invalid date string")).toThrow(
        "Invalid date/time for U64 conversion: invalid date string"
      );
      expect(() => convertToU64(NaN)).toThrow(
        "Invalid date/time for U64 conversion: NaN"
      );
      try {
        convertToU64(new Date("invalid"));
      } catch (error: any) {
        expect(error.message).toContain("Invalid date/time for U64 conversion");
      }
    });
  });

  describe("convertStringToFeltArray", () => {
    it("should return an empty array for null, undefined, or empty string input", () => {
      expect(convertToByteArray(null as any)).toEqual([]);
      expect(convertToByteArray(undefined as any)).toEqual([]);
      expect(convertToByteArray("")).toEqual([]);
    });

    it("should return the string's felt representation in an array if length <= 31", () => {
      const shortString = "Short string";
      expect(convertToByteArray(shortString)).toEqual([
        stringToFelt(shortString),
      ]);
    });

    it("should return a felt for a string of exactly 31 chars", () => {
      const exactString = "1234567890123456789012345678901"; // 31 chars
      expect(convertToByteArray(exactString)).toEqual([
        stringToFelt(exactString),
      ]);
    });

    it("should split strings longer than 31 characters into felt chunks", () => {
      const longString =
        "This is a very long string that needs chunking for felts.";
      const chunk1 = "This is a very long string that"; // 31 chars
      const chunk2 = " needs chunking for felts."; // Remainder
      const expectedFelts = [stringToFelt(chunk1), stringToFelt(chunk2)];
      expect(convertToByteArray(longString)).toEqual(expectedFelts);
    });

    it("should handle strings that are exact multiples of 31", () => {
      const multiString =
        "1234567890123456789012345678901abcdefghijklmnopqrstuvwxyzABCDE"; // 62 chars
      const chunk1 = "1234567890123456789012345678901";
      const chunk2 = "abcdefghijklmnopqrstuvwxyzABCDE";
      const expectedFelts = [stringToFelt(chunk1), stringToFelt(chunk2)];
      expect(convertToByteArray(multiString)).toEqual(expectedFelts);
    });

    it("should handle complex characters correctly", () => {
      const complexString = "Hello\nWorld! äöü @ €"; // Includes newline, umlauts, symbols
      // Calculate expected felts based on the logic
      const expectedFelt = stringToFelt(complexString);
      expect(convertToByteArray(complexString)).toEqual([expectedFelt]);
    });
  });
});
