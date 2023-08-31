export interface UserProps {
    name: string
    title: string
    img?: string
    notes?: string
}

export interface User extends UserProps {
    id: number
}
