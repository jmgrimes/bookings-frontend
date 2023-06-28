import { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"

import UserPicker from "~/components/users/UserPicker"
import { IUserView } from "~/features/models/users"

const users: IUserView[] = [
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

export const Default: StoryFn<typeof UserPicker> = args => {
    const [user, setUser] = useState(args.users[0])
    return <UserPicker users={args.users} user={user} setUser={setUser} />
}
Default.args = {}

export default {
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
} as Meta<typeof UserPicker>
