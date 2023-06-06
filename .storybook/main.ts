import { StorybookConfig } from "@storybook/nextjs";
const storybookConfig: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials", 
    "@storybook/addon-interactions", 
    "@storybook/addon-links", 
  ],
  docs: {
    autodocs: false
  },
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        fsCache: true,
        lazyCompilation: true,
      }
    }
  },
  stories: [
    "../src/components/**/*.mdx", 
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ]
};
export default storybookConfig;