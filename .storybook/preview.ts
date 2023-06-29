import { Preview } from "@storybook/react"

import "bootstrap/dist/css/bootstrap.css"

export default {
    parameters: {
        actions: {
            argTypesRegex: "^on[A-Z].*",
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: "alphabetical",
            },
        },
    },
} as Preview
