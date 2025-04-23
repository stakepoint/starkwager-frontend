import { apiClient } from "./client";
import { API_ENDPOINTS } from "./config";
import {
  ApiResponse,
  CreateUserRequest,
  CreateUserResponse,
  User,
} from "./types";

/**
 * User API service
 * Contains methods for interacting with user-related endpoints
 */
export const userService = {
  /**
   * Create a new user
   * If the username already exists, the API will throw an error
   *
   * @param userData - User data including address, username, and picture
   * @returns Promise with the created user data
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<CreateUserResponse>(
      API_ENDPOINTS.AUTH.CREATE,
      userData
    );

    if (response.error) {
      // The API will return an error if the username already exists
      throw new Error(response.error.message);
    }

    if (!response.data?.user) {
      throw new Error("User creation failed");
    }

    return response.data.user;
  },
};
