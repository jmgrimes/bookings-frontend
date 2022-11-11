import { ComponentMeta, ComponentStory } from "@storybook/react"

import Button from "./Button"

const Template: ComponentStory<typeof Button> = args => {
    return <Button {...args} />
}

export const Cancel: ComponentStory<typeof Button> = Template.bind({})
Cancel.args = { variant: "cancel" }

export const Delete: ComponentStory<typeof Button> = Template.bind({})
Delete.args = { variant: "delete" }

export const Edit: ComponentStory<typeof Button> = Template.bind({})
Edit.args = { variant: "edit" }

export const Next: ComponentStory<typeof Button> = Template.bind({})
Next.args = { variant: "next" }

export const Previous: ComponentStory<typeof Button> = Template.bind({})
Previous.args = { variant: "previous" }

export const Save: ComponentStory<typeof Button> = Template.bind({})
Save.args = { variant: "save" }

export const View: ComponentStory<typeof Button> = Template.bind({})
View.args = { variant: "view" }

export default {
    component: Button,
    title: "Application/Buttons/Button",
    args: {
        onClick: () => {},
    },
    parameters: {
        controls: {
            exclude: ["variant", "onClick"],
        },
    },
} as ComponentMeta<typeof Button>
