import { Meta, StoryFn, StoryObj } from "@storybook/react"

import UserCard from "~/components/users/UserCard"
import { User } from "~/features/models/users"

const user: User = {
    id: 1,
    name: "John Doe",
    title: "Demonstration Doctor",
    notes: "A sample user object, John Doe is the perfect demonstration persona.",
}

const Template: StoryFn<typeof UserCard> = args => {
    return <UserCard {...args} />
}

export const Default: StoryObj<typeof UserCard> = Template.bind({})
Default.args = {}

export default {
    component: UserCard,
    title: "Users/Public/UserCard",
    args: {
        user,
    },
} as Meta<typeof UserCard>
