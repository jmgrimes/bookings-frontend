import { Meta, StoryFn, StoryObj } from "@storybook/react"

import Button from "~/components/controls/Button"

const Template: StoryFn<typeof Button> = args => {
    return <Button {...args} />
}

export const Cancel: StoryObj<typeof Button> = Template.bind({})
Cancel.args = { variant: "cancel" }

export const Delete: StoryObj<typeof Button> = Template.bind({})
Delete.args = { variant: "delete" }

export const Edit: StoryObj<typeof Button> = Template.bind({})
Edit.args = { variant: "edit" }

export const Next: StoryObj<typeof Button> = Template.bind({})
Next.args = { variant: "next" }

export const Previous: StoryObj<typeof Button> = Template.bind({})
Previous.args = { variant: "previous" }

export const Save: StoryObj<typeof Button> = Template.bind({})
Save.args = { variant: "save" }

export const View: StoryObj<typeof Button> = Template.bind({})
View.args = { variant: "view" }

export default {
    component: Button,
    title: "Controls/Public/Button",
    args: {
        onClick: () => {},
    },
    parameters: {
        controls: {
            exclude: ["variant", "onClick"],
        },
    },
} as Meta<typeof Button>
