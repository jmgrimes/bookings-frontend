import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableSessionsList from "./BookableSessionsList"
import { BookableSession } from "./types"

const meta: Meta<typeof BookableSessionsList> = {
    component: BookableSessionsList,
    title: "Bookables/Private/BookableSessionsList",
}

const Template: StoryFn<typeof BookableSessionsList> = args => {
    return <BookableSessionsList {...args} />
}

export const Default: StoryObj<typeof BookableSessionsList> = Template.bind({})
Default.args = { sessions: BookableSession.values }

export const Empty: StoryObj<typeof BookableSessionsList> = Template.bind({})
Empty.args = { sessions: [] }

export default meta
