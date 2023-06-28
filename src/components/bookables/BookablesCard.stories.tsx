import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"

import BookablesCard from "~/components/bookables/BookablesCard"
import { IBookableView, BookableDay, BookableSession } from "~/features/models/bookables"

const bookables: IBookableView[] = [
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
    {
        id: 4,
        title: "My Device 1",
        notes: "A sample bookable object, with default availability in the 'Devices' group.",
        group: "Devices",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
    {
        id: 5,
        title: "My Device 2",
        notes: "A sample bookable object, with default availability in the 'Devices' group.",
        group: "Devices",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
    {
        id: 6,
        title: "My Device 3",
        notes: "A sample bookable object, with default availability in the 'Devices' group.",
        group: "Devices",
        days: BookableDay.values,
        sessions: BookableSession.values,
    },
]

export const Default: StoryFn<typeof BookablesCard> = args => {
    const [bookable, setBookable] = useState(args.bookable)
    return <BookablesCard bookables={args.bookables} bookable={bookable} onSelect={setBookable} />
}
Default.args = {}

export default {
    component: BookablesCard,
    title: "Bookables/Public/BookablesCard",
    args: {
        bookables,
        bookable: bookables.find(bookable => bookable.id === 1),
    },
    parameters: {
        controls: {
            exclude: ["bookable", "onSelect"],
        },
    },
} as Meta<typeof BookablesCard>
