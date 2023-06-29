import { Meta, StoryFn, StoryObj } from "@storybook/react"

import ErrorMessage from "~/components/controls/ErrorMessage"

const Template: StoryFn<typeof ErrorMessage> = args => {
    const { message, error } = args
    return <ErrorMessage message={message} error={error} />
}

export const Default: StoryObj<typeof ErrorMessage> = Template.bind({})
Default.args = {
    message: "There was an error.",
    error: new Error("This is an error that occurred."),
}

export default {
    component: ErrorMessage,
    title: "Controls/Public/ErrorMessage",
} as Meta<typeof ErrorMessage>