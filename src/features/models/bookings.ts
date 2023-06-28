import { BookableSession } from "~/features/models/bookables"

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
    session: BookableSession
}

export interface IBooking extends IBookingProps {
    id: number
}
