import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableDaysList from "./BookableDaysList"
import { BookableDay } from "./types"

const meta: Meta<typeof BookableDaysList> = {
    component: BookableDaysList,
    title: "Bookables/Private/BookableDaysList",
}

const Template: StoryFn<typeof BookableDaysList> = args => {
    return <BookableDaysList {...args} />
}

export const Default: StoryObj<typeof BookableDaysList> = Template.bind({})
Default.args = { days: BookableDay.values }

export const Empty: StoryObj<typeof BookableDaysList> = Template.bind({})
Empty.args = { days: [] }

export default meta
