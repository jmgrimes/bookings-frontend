import { BookableSession } from "~/features/bookables"

import { ComponentMeta, ComponentStory } from "@storybook/react"

import BookableSessionsList from "./BookableSessionsList"

const Template: ComponentStory<typeof BookableSessionsList> = args => {
    return <BookableSessionsList {...args} />
}

export const Default: ComponentStory<typeof BookableSessionsList> = Template.bind({})
Default.args = { sessions: BookableSession.values }

export const Empty: ComponentStory<typeof BookableSessionsList> = Template.bind({})
Empty.args = { sessions: [] }

export default {
    component: BookableSessionsList,
    title: "Bookables/Private/BookableSessionsList",
} as ComponentMeta<typeof BookableSessionsList>
