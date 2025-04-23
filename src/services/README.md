# API Services

This directory contains the API service layer for communicating with the backend API.

## Structure

- `api/` - API-related files
  - `client.ts` - Core API client with request handling
  - `config.ts` - API configuration and endpoints
  - `types.ts` - TypeScript interfaces for API requests/responses
  - `userService.ts` - User-related API methods
  - `index.ts` - Entry point for exporting all API services

## Usage Examples

### Checking if a username exists

```typescript
import { userService } from "@/services/api";

async function checkUsername(username: string) {
  try {
    const exists = await userService.checkUsernameExists(username);
    if (exists) {
      console.log("Username is already taken");
    } else {
      console.log("Username is available");
    }
    return exists;
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
}
```

### Creating a new user

```typescript
import { userService } from "@/services/api";
import { CreateUserRequest } from "@/services/api/types";

async function registerUser(userData: CreateUserRequest) {
  try {
    const user = await userService.createUser(userData);
    console.log("User created successfully:", user);
    return user;
  } catch (error) {
    // Check if the error is related to username already existing
    if (
      error instanceof Error &&
      error.message.includes("username") &&
      error.message.includes("exists")
    ) {
      console.error("Username already taken:", error);
      // Handle username taken scenario
    } else {
      console.error("Error creating user:", error);
    }
    throw error;
  }
}
```

### Getting a user by address

```typescript
import { userService } from "@/services/api";

async function fetchUserProfile(address: string) {
  try {
    const user = await userService.getUserByAddress(address);
    if (user) {
      console.log("User found:", user);
    } else {
      console.log("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
```

## Adding New API Endpoints

To add a new API endpoint:

1. Define the endpoint URL in `config.ts`
2. Add TypeScript interfaces for request/response in `types.ts`
3. Create a new service file or add methods to an existing service file
4. Export the new service in `index.ts`

## Error Handling

All API calls include built-in error handling. Errors can be caught using try/catch blocks.

When creating a user, the API will return an error if the username already exists. You should handle this specific error case in your application code.
