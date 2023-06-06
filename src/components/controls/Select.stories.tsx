import { Meta, StoryFn, StoryObj } from "@storybook/react"
import { ChangeEventHandler, useState } from "react"

import Select from "./Select"

const values: string[] = ["Value 1", "Value 2", "Value 3", "Value 4"]

const meta: Meta<typeof Select> = {
    component: Select,
    title: "Controls/Public/Select",
    args: {
        values,
    },
    parameters: {
        controls: {
            exclude: ["value", "onChange"],
        },
    },
}

const Template: StoryFn<typeof Select> = args => {
    const [value, setValue] = useState(args.value)
    const onChange: ChangeEventHandler<HTMLSelectElement> = event => setValue(event.target.value)
    return <Select value={value} values={args.values} onChange={onChange} />
}

export const Default: StoryObj<typeof Select> = Template.bind({})
Default.args = {}

export default meta
