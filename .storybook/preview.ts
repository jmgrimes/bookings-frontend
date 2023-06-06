import { Preview } from "@storybook/react"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

const preview: Preview = {
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
                method: "alphabetical"
            },
        },
    },
}

export default preview