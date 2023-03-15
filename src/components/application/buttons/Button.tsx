import { FunctionComponent, MouseEventHandler } from "react"
import { Button as BootstrapButton } from "react-bootstrap"
import { ArrowLeft, ArrowRight, Icon, Pencil, Save, Search, Trash, X } from "react-bootstrap-icons"

type Variant = "cancel" | "delete" | "edit" | "next" | "previous" | "save" | "view"
interface VariantProps {
    title: string
    reverseIcon: boolean
    IconComponent: Icon
}

const variants = new Map<Variant, VariantProps>([
    ["cancel", { title: "Cancel", reverseIcon: false, IconComponent: X }],
    ["delete", { title: "Delete", reverseIcon: false, IconComponent: Trash }],
    ["edit", { title: "Edit", reverseIcon: false, IconComponent: Pencil }],
    ["next", { title: "Next", reverseIcon: true, IconComponent: ArrowRight }],
    ["previous", { title: "Previous", reverseIcon: false, IconComponent: ArrowLeft }],
    ["save", { title: "Save", reverseIcon: false, IconComponent: Save }],
    ["view", { title: "View", reverseIcon: false, IconComponent: Search }],
])

interface ButtonProps {
    title?: string
    variant: Variant
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: FunctionComponent<ButtonProps> = ({ title: overrideTitle, variant, onClick }) => {
    const variantProps = variants.get(variant) as VariantProps
    const { title = overrideTitle, reverseIcon, IconComponent } = variantProps
    return (
        <BootstrapButton variant="outline-primary" onClick={onClick}>
            {!reverseIcon && <IconComponent />} {title} {reverseIcon && <IconComponent />}
        </BootstrapButton>
    )
}

export default Button
