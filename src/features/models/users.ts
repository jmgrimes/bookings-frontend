import { IBookingView } from "~/features/models/bookings"

export interface IUserProps {
    name: string
    title: string
    img?: string
    notes?: string
}

export interface IUser extends IUserProps {
    id: number
}

export interface IUserView extends IUser {
    bookings?: IBookingView[]
}
