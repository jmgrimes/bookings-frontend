import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableCard from "./BookableCard"
import { Bookable, BookableDay, BookableSession } from "./types"

const bookable: Bookable = {
    id: 1,
    title: "My Bookable",
    notes: "A sample bookable object, with default availability in the 'Bookables' group.",
    group: "Bookables",
    days: BookableDay.values,
    sessions: BookableSession.values,
}

const meta: Meta<typeof BookableCard> = {
    component: BookableCard,
    title: "Bookables/Public/BookableCard",
    args: {
        bookable,
    },
    parameters: {
        controls: {
            exclude: ["onEdit", "onView", "onDelete"],
        },
    },
}

const Template: StoryFn<typeof BookableCard> = args => {
    return <BookableCard {...args} />
}

export const Default: StoryObj<typeof BookableCard> = Template.bind({})
Default.args = {}

export const Actions: StoryObj<typeof BookableCard> = Template.bind({})
Actions.args = {
    onEdit: () => {},
    onView: () => {},
    onDelete: () => {},
}

export default meta
