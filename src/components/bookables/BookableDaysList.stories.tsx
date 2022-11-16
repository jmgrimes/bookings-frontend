import { ComponentMeta, ComponentStory } from "@storybook/react"

import BookableDaysList from "./BookableDaysList"
import { BookableDay } from "./types"

const Template: ComponentStory<typeof BookableDaysList> = args => {
    return <BookableDaysList {...args} />
}

export const Default: ComponentStory<typeof BookableDaysList> = Template.bind({})
Default.args = { days: BookableDay.values }

export const Empty: ComponentStory<typeof BookableDaysList> = Template.bind({})
Empty.args = { days: [] }

export default {
    component: BookableDaysList,
    title: "Bookables/Private/BookableDaysList",
} as ComponentMeta<typeof BookableDaysList>
