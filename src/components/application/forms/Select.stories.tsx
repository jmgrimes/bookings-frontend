import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ChangeEventHandler, useState } from "react"

import Select from "./Select"

const values: string[] = ["Value 1", "Value 2", "Value 3", "Value 4"]

const Template: ComponentStory<typeof Select> = args => {
    const [value, setValue] = useState(args.value)
    const onChange: ChangeEventHandler<HTMLSelectElement> = event => setValue(event.target.value)
    return <Select value={value} values={args.values} onChange={onChange} />
}

export const Default: ComponentStory<typeof Select> = Template.bind({})
Default.args = {}

export default {
    component: Select,
    title: "Application/Forms/Select",
    args: {
        values,
    },
    parameters: {
        controls: {
            exclude: ["value", "onChange"],
        },
    },
} as ComponentMeta<typeof Select>
