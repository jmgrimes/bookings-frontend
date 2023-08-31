import { Meta, StoryFn, StoryObj } from "@storybook/react"
import { useState } from "react"

import BookablesList from "~/components/bookables/BookablesList"
import { Bookable, BookableDay, BookableSession } from "~/features/models/bookables"

const bookables: Bookable[] = [
    {
        id: 1,
        title: "My Room 1",
        notes: "A sample bookable object, with default availability in the 'Rooms' group.",
        group: "Rooms",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
    {
        id: 2,
        title: "My Room 2",
        notes: "A sample bookable object, with default availability in the 'Rooms' group.",
        group: "Rooms",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
    {
        id: 3,
        title: "My Room 3",
        notes: "A sample bookable object, with default availability in the 'Rooms' group.",
        group: "Rooms",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
]

const SelectedTemplate: StoryFn<typeof BookablesList> = args => {
    const [bookable, setBookable] = useState(args.bookable)
    return <BookablesList bookables={args.bookables} bookable={bookable} onSelect={setBookable} />
}

export const Default: StoryFn<typeof BookablesList> = args => {
    return <BookablesList {...args} />
}
Default.args = {}

export const Selected: StoryObj<typeof BookablesList> = SelectedTemplate.bind({})
Selected.args = { bookable: bookables.find(bookable => bookable.id === 1) }

export const Unselected: StoryObj<typeof BookablesList> = SelectedTemplate.bind({})
Unselected.args = {}

export default {
    component: BookablesList,
    title: "Bookables/Private/BookablesList",
    args: {
        bookables,
    },
    parameters: {
        controls: {
            exclude: ["bookable", "onSelect"],
        },
    },
} as Meta<typeof BookablesList>
