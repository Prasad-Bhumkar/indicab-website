import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";

const _config: StorybookConfig = {
    "stories": [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook"
    ],
    "framework": {
        "name": "@storybook/experimental-nextjs-vite",
        "options": {}
    },
    "staticDirs": [
        "../public"
    ]
};
export default _config;

export { default } from '../config/storybook/main';
