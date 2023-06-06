const nextJest = require("next/jest")

const createJestConfig = nextJest({
    dir: "./",
})

/** @type {import('jest').Config} */
const jestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
}

module.exports = createJestConfig(jestConfig)
