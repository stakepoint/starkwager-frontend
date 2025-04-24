import { API_ENDPOINTS } from "./config";
import axiosClient from "./axiosClient";

interface CreateUserParams {
  address: string;
  username: string;
  picture?: string;
}

interface User {
  id: string;
  username: string;
  address: string;
  email: string | null;
  picture: string | null;
  isVerified: boolean;
  roles: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user?: User;
}

const createUser = async (params: CreateUserParams): Promise<AuthResponse> => {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.CREATE, params);
  return response.data;
};

export const userService = {
  createUser,
};
