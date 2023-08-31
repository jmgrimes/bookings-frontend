import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableCard from "~/components/bookables/BookableCard"
import { Bookable, BookableDay, BookableSession } from "~/features/models/bookables"

const bookable: Bookable = {
    id: 1,
    title: "My Bookable",
    notes: "A sample bookable object, with default availability in the 'Bookables' group.",
    group: "Bookables",
    days: BookableDay.values,
    sessions: BookableSession.values,
}

const Template: StoryFn<typeof BookableCard> = args => {
    return <BookableCard {...args} />
}

export const Default: StoryObj<typeof BookableCard> = Template.bind({})
Default.args = {}

export default {
    component: BookableCard,
    title: "Bookables/Public/BookableCard",
    args: {
        bookable,
    },
} as Meta<typeof BookableCard>
