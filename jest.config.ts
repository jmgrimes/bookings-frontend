import nextJest from "next/jest"
import type { Config } from "jest"

const createJestConfig = nextJest({
    dir: "./",
})

const config: Config = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
}

export default createJestConfig(config)
