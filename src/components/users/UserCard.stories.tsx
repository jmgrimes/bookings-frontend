import { Meta, StoryFn, StoryObj } from "@storybook/react"

import UserCard from "~/components/users/UserCard"
import { IUserView } from "~/features/models/users"

const user: IUserView = {
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

export const Actions: StoryObj<typeof UserCard> = Template.bind({})
Actions.args = {
    onEdit: () => {},
    onView: () => {},
    onDelete: () => {},
}

export default {
    component: UserCard,
    title: "Users/Public/UserCard",
    args: {
        user,
    },
    parameters: {
        controls: {
            exclude: ["onEdit", "onView", "onDelete"],
        },
    },
} as Meta<typeof UserCard>
