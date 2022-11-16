const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    "core": {
        "builder": "@storybook/builder-webpack5",
    },
    "framework": "@storybook/react",
    "stories": [
        "../src/components/**/*.stories.mdx",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    "webpackFinal": async (config) => {
        config.resolve.plugins = [new TsconfigPathsPlugin()]
        return config
    },
}