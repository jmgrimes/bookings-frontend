import { ComponentMeta, ComponentStory } from "@storybook/react"

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

const Template: ComponentStory<typeof BookableCard> = args => {
    return <BookableCard {...args} />
}

export const DefaultNoActions: ComponentStory<typeof BookableCard> = Template.bind({})
DefaultNoActions.args = { bookable }

export const DefaultWithActions: ComponentStory<typeof BookableCard> = Template.bind({})
DefaultWithActions.args = {
    bookable,
    onEdit: () => {},
    onView: () => {},
    onDelete: () => {},
}

export default {
    component: BookableCard,
    title: "Bookables/Public/BookableCard",
    parameters: {
        controls: {
            exclude: ["onEdit", "onView", "onDelete"],
        },
    },
} as ComponentMeta<typeof BookableCard>
