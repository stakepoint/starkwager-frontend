// TODO: Replace with actual ABI and contract address
export const WAGER_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_WAGER_CONTRACT_ADDRESS as `0x${string}`;

// TODO: Replace with actual Contract ABI
export const WAGER_ABI = [
  {
    name: "create_wager",
    type: "function",
    inputs: [
      {
        name: "category",
        type: "contracts::wager::types::Category",
      },
      {
        name: "title",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "terms",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "stake",
        type: "core::integer::u256",
      },
      {
        name: "mode",
        type: "contracts::wager::types::Mode",
      },
      {
        name: "claim",
        type: "contracts::wager::types::Claim",
      },
      {
        name: "resolution_time",
        type: "core::integer::u64",
      },
    ],
    outputs: [
      {
        type: "core::integer::u64",
      },
    ],
    state_mutability: "external",
  },
];
