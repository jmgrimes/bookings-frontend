import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"

import UsersCard from "./UsersCard"
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

export const Default: ComponentStory<typeof UsersCard> = args => {
    const [user, setUser] = useState(args.user)
    return <UsersCard users={args.users} user={user} onSelect={setUser} />
}
Default.args = {}

export default {
    component: UsersCard,
    title: "Users/Public/UsersCard",
    args: {
        users,
        user: users.find(user => user.id === 1),
    },
    parameters: {
        controls: {
            exclude: ["user", "onSelect"],
        },
    },
} as ComponentMeta<typeof UsersCard>
