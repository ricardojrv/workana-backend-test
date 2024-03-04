module.exports = {
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/**/*.test.ts"],
  testEnvironment: "node",
  preset: "ts-jest",
  setupFilesAfterEnv: ['./src/__tests__/__mocks__/mocks.ts'],
};