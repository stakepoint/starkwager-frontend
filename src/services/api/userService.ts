import { API_ENDPOINTS } from "./config";
import axiosClient from "./axiosClient";
// import { apiClient } from "./client";

interface CreateUserParams {
  address: string;
  username: string;
  picture?: string;
}

interface UpdateUserParams {
  username: string;
  picture?: string;
}

interface RefreshTokenParams {
  refreshToken: string;
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

const refreshAccessToken = async (
  params: RefreshTokenParams
): Promise<AuthResponse> => {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.REFRESH);
  return response.data;
};

const updateUser = async (params: UpdateUserParams): Promise<User> => {
  const response = await axiosClient.patch(API_ENDPOINTS.USERS.UPDATE, params);
  return response.data;
};

const getUserById = async (userId: string): Promise<User> => {
  const response = await axiosClient.get(API_ENDPOINTS.USERS.GET(userId));
  return response.data;
};

export const userService = {
  createUser,
  updateUser,
  getUserById,
  refreshAccessToken,
};
