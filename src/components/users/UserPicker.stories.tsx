import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"

import UserPicker from "./UserPicker"
import { User } from "./types"

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        title: "Demonstration Doctor",
        notes: "A sample user object, John Doe is the perfect demonstration persona.",
    },
    {
        id: 2,
        name: "Jane Doe",
        title: "Example Engineer",
        notes: "A sample user object, Jane Doe is engineers great examples.",
    },
    {
        id: 3,
        name: "Jim Doe",
        title: "Sample Sultan",
        notes: "A sample user object, Jim Doe presides over all other sample data.",
    },
]

const meta: Meta<typeof UserPicker> = {
    component: UserPicker,
    title: "Users/Public/UserPicker",
    args: {
        users,
    },
    parameters: {
        controls: {
            exclude: ["user", "setUser"],
        },
    },
}

export const Default: StoryFn<typeof UserPicker> = args => {
    const [user, setUser] = useState(args.users[0])
    return <UserPicker users={args.users} user={user} setUser={setUser} />
}
Default.args = {}

export default meta
