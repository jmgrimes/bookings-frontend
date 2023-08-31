import { MouseEventHandler } from "react"
import {
    faArrowLeft,
    faArrowRight,
    faPencil,
    faSave,
    faSearch,
    faTrash,
    faX,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const variants = new Map<ButtonVariant, ButtonVariantProps>([
    ["cancel", { title: "Cancel", reverseIcon: false, IconComponent: faX }],
    ["delete", { title: "Delete", reverseIcon: false, IconComponent: faTrash }],
    ["edit", { title: "Edit", reverseIcon: false, IconComponent: faPencil }],
    ["next", { title: "Next", reverseIcon: true, IconComponent: faArrowRight }],
    ["previous", { title: "Previous", reverseIcon: false, IconComponent: faArrowLeft }],
    ["save", { title: "Save", reverseIcon: false, IconComponent: faSave }],
    ["view", { title: "View", reverseIcon: false, IconComponent: faSearch }],
])

export interface ButtonVariantProps {
    title: string
    reverseIcon: boolean
    IconComponent: IconDefinition
}

export type ButtonVariant = "cancel" | "delete" | "edit" | "next" | "previous" | "save" | "view"

export interface ButtonProps {
    title?: string
    variant: ButtonVariant
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: ButtonProps) {
    const { title: overrideTitle, variant, onClick } = props
    const variantProps = variants.get(variant) as ButtonVariantProps
    const { title = overrideTitle, reverseIcon, IconComponent } = variantProps
    return (
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>
            {!reverseIcon && <FontAwesomeIcon icon={IconComponent} />} {title}
            {reverseIcon && " "}
            {reverseIcon && <FontAwesomeIcon icon={IconComponent} />}
        </button>
    )
}
