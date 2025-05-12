export const CONTRACT_ABI = [
  {
    "name": "get_balance",
    "type": "function",
    "inputs": [
      {
        "name": "address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ],
    "outputs": [
      {
        "type": "core::integer::u256"
      }
    ],
    "state_mutability": "view"
  }
];

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const WALLET_CONTRACT_ABI = [
  {
    name: "fund_wallet",
    type: "function",
    inputs: [
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  },
  {
    name: "get_balance",
    type: "function",
    inputs: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress"
      }
    ],
    outputs: [
      {
        type: "core::integer::u256"
      }
    ],
    state_mutability: "view"
  }
  // ...other wallet functions if needed
];

export const WALLET_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_WALLET_CONTRACT_ADDRESS as `0x${string}` ||
  "0x05512ac945e3ff26e5543ebbae6c71fbe637032cb2c2f45ba8ead233a83367f2"; 