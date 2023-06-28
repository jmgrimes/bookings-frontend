import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableDaysList from "~/components/bookables/BookableDaysList"
import { BookableDay } from "~/features/models/bookables"

const Template: StoryFn<typeof BookableDaysList> = args => {
    return <BookableDaysList {...args} />
}

export const Default: StoryObj<typeof BookableDaysList> = Template.bind({})
Default.args = { days: BookableDay.values }

export const Empty: StoryObj<typeof BookableDaysList> = Template.bind({})
Empty.args = { days: [] }

export default {
    component: BookableDaysList,
    title: "Bookables/Private/BookableDaysList",
} as Meta<typeof BookableDaysList>
