export const CONTRACT_ABI = [
  {
    name: "get_balance",
    type: "function",
    inputs: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
];

export const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_WALLET_CONTRACT_ADDRESS as `0x${string}`;

export const STARKNET_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_STARKNET_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

export const ESCROW_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x5d9fe25486f71d0d7a58551316ac287399b5abb64e7af43eeee6a0eba800c2d";

export const STARKNET_CONTRACT_ABI = [
  {
    name: "approve",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    stateMutability: "external",
  },
];

export const WALLET_CONTRACT_ABI = [
  {
    name: "fund_wallet",
    type: "function",
    inputs: [
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "get_balance",
    type: "function",
    inputs: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  // ...other wallet functions if needed
];

export const WALLET_CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_WALLET_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x05512ac945e3ff26e5543ebbae6c71fbe637032cb2c2f45ba8ead233a83367f2";
