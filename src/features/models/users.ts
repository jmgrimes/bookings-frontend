export interface IUserProps {
    name: string
    title: string
    img: string
    notes?: string
}

export interface IUser extends IUserProps {
    id: number
}
