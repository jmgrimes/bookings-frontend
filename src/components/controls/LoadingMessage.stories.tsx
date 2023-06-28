import { Meta, StoryFn, StoryObj } from "@storybook/react"

import LoadingMessage from "~/components/controls/LoadingMessage"

const Template: StoryFn<typeof LoadingMessage> = args => {
    const { message } = args
    return <LoadingMessage message={message} />
}

export const Default: StoryObj<typeof LoadingMessage> = Template.bind({})
Default.args = {
    message: "This component is loading...",
}

export default {
    component: LoadingMessage,
    title: "Controls/Public/LoadingMessage",
} as Meta<typeof LoadingMessage>
