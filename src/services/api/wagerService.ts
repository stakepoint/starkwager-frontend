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

export const wagerService = {
  createWager,
  getAllCategories,
  getAllHashtags,
};
