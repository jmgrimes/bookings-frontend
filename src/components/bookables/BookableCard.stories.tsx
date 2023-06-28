import { Meta, StoryFn, StoryObj } from "@storybook/react"

import BookableCard from "~/components/bookables/BookableCard"
import { IBookableView, BookableDay, BookableSession } from "~/features/models/bookables"

const bookable: IBookableView = {
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

export const Actions: StoryObj<typeof BookableCard> = Template.bind({})
Actions.args = {
    onEdit: () => {},
    onView: () => {},
    onDelete: () => {},
}

export default {
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
} as Meta<typeof BookableCard>
