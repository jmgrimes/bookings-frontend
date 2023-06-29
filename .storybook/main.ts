import { StorybookConfig } from "@storybook/nextjs"

export default {
    addons: ["@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-links"],
    docs: {
        autodocs: false,
    },
    framework: {
        name: "@storybook/nextjs",
        options: {
            builder: {
                fsCache: true,
                lazyCompilation: true,
            },
        },
    },
    stories: ["../src/components/**/*.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
} as StorybookConfig
