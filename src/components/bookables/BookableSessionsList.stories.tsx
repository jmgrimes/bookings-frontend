import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableSessionsList from "~/components/bookables/BookableSessionsList"
import { BookableSession } from "~/features/models/bookables"

const Template: StoryFn<typeof BookableSessionsList> = args => {
    return <BookableSessionsList {...args} />
}

export const Default: StoryObj<typeof BookableSessionsList> = Template.bind({})
Default.args = { sessions: BookableSession.values }

export const Empty: StoryObj<typeof BookableSessionsList> = Template.bind({})
Empty.args = { sessions: [] }

export default {
    component: BookableSessionsList,
    title: "Bookables/Private/BookableSessionsList",
} as Meta<typeof BookableSessionsList>
