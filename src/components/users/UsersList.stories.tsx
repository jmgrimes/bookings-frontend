import { Meta, StoryFn, StoryObj } from "@storybook/react"
import { useState } from "react"

import UsersList from "./UsersList"
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

const meta: Meta<typeof UsersList> = {
    component: UsersList,
    title: "Users/Private/UsersList",
    args: {
        users,
    },
    parameters: {
        controls: {
            exclude: ["user", "onSelect"],
        },
    },
}

const SelectedTemplate: StoryFn<typeof UsersList> = args => {
    const [user, setUser] = useState(args.user)
    return <UsersList users={args.users} user={user} onSelect={setUser} />
}

export const Default: StoryFn<typeof UsersList> = args => {
    return <UsersList {...args} />
}
Default.args = {}

export const Selected: StoryObj<typeof UsersList> = SelectedTemplate.bind({})
Selected.args = { user: users.find(user => user.id === 1) }

export const Unselected: StoryObj<typeof UsersList> = SelectedTemplate.bind({})
Unselected.args = {}

export default meta
