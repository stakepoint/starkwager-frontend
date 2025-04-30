module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Map the '@/' path alias to the 'src/' directory
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Optional: setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // If you have setup files
};
