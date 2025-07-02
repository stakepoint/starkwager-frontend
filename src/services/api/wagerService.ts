import { API_ENDPOINTS } from "./config";
import axiosClient from "./axiosClient";

interface CreateWagerParams {
  name: string;
  description: string;
  categoryId: string;
  stakeAmount: number;
  status: string;
  createdById: string;
  txHash: string;
  txStatus: string;
  hashtags: string[];
}

//! Should be changed after making first API call
const createWager = async (params: CreateWagerParams): Promise<any> => {
  const response = await axiosClient.post(API_ENDPOINTS.WAGER.CREATE, params);
  return response.data;
};

const getAllCategories = async (): Promise<any> => {
  const response = await axiosClient.get(API_ENDPOINTS.CATEGORIES.ALL);
  return response.data;
};

const getAllHashtags = async (): Promise<any> => {
  const response = await axiosClient.get(API_ENDPOINTS.HASHTAGS.ALL);
  return response.data;
};

const getAllWagers = async (token?: string): Promise<any> => {
  const response = await axiosClient.get(API_ENDPOINTS.WAGER.ALL,  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Mock data for testing
const getMockWagers = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Bitcoin Price Prediction",
          description: "Will Bitcoin Hit $100k Before January 31, 2025?",
          stakeAmount: 100,
          status: "active",
          createdById: "user1",
          createdBy: {
            username: "noyi24_7",
            avatar: "/images/leftWagercardUserOneIcon.svg",
          },
          opponent: {
            username: "babykeem",
            avatar: "/images/rightWagercardUserOneIcon.svg",
          },
        },
        {
          id: "2",
          name: "Ethereum Price Prediction",
          description: "Will Ethereum reach $5000 by March 2025?",
          stakeAmount: 50,
          status: "active",
          createdById: "user2",
          createdBy: {
            username: "crypto_trader",
            avatar: "/images/leftWagercardUserOneIcon.svg",
          },
          opponent: {
            username: "eth_believer",
            avatar: "/images/rightWagercardUserOneIcon.svg",
          },
        },
        {
          id: "3",
          name: "Sports Bet",
          description: "Will Lakers win the championship this season?",
          stakeAmount: 75,
          status: "pending",
          createdById: "user3",
          createdBy: {
            username: "sports_fan",
            avatar: "/images/leftWagercardUserOneIcon.svg",
          },
          opponent: null,
        },
        {
          id: "4",
          name: "Tech Stock Prediction",
          description: "Will Apple stock hit $250 by end of 2025?",
          stakeAmount: 200,
          status: "completed",
          createdById: "user4",
          createdBy: {
            username: "stock_guru",
            avatar: "/images/leftWagercardUserOneIcon.svg",
          },
          opponent: {
            username: "bear_trader",
            avatar: "/images/rightWagercardUserOneIcon.svg",
          },
        },
        {
          id: "5",
          name: "Weather Bet",
          description: "Will it snow in New York this December?",
          stakeAmount: 25,
          status: "completed",
          createdById: "user5",
          createdBy: {
            username: "weather_watcher",
            avatar: "/images/leftWagercardUserOneIcon.svg",
          },
          opponent: {
            username: "climate_expert",
            avatar: "/images/rightWagercardUserOneIcon.svg",
          },
        },
      ]);
    }, 1500); // Simulate network delay
  });
};

export const wagerService = {
  createWager,
  getAllCategories,
  getAllHashtags,
  getAllWagers,
  getMockWagers,
};
