import { ComponentMeta, ComponentStory } from "@storybook/react"

import UserCard from "./UserCard"
import { User } from "./types"

const user: User = {
    id: 1,
    name: "John Doe",
    title: "Demonstration Doctor",
    notes: "A sample user object, John Doe is the perfect demonstration persona.",
}

const Template: ComponentStory<typeof UserCard> = args => {
    return <UserCard {...args} />
}

export const Default: ComponentStory<typeof UserCard> = Template.bind({})
Default.args = {}

export const Actions: ComponentStory<typeof UserCard> = Template.bind({})
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
} as ComponentMeta<typeof UserCard>
