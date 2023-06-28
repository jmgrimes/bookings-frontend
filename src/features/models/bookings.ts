import { BookableSessionEnum, IBookableView } from "~/features/models/bookables"
import { IUserView } from "~/features/models/users"

export interface IBookingQuery {
    bookerId?: number
    bookableId?: number
    startDate?: string
    endDate?: string
}

export interface IBookingProps {
    bookerId: number
    bookableId: number
    title: string
    date: string
    notes?: string
    session: BookableSessionEnum
}

export interface IBooking extends IBookingProps {
    id: number
}

export interface IBookingView extends IBooking {
    booker?: IUserView
    bookable?: IBookableView
}
