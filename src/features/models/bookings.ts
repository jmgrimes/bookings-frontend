import { DateTime } from "luxon"

import { BookableSessionEnum } from "~/features/models/bookables"

export interface BookingQuery {
    bookerId?: number
    bookableId?: number
    startDate?: DateTime
    endDate?: DateTime
}

export interface BookingProps {
    bookerId: number
    bookableId: number
    title: string
    date: DateTime
    notes?: string
    session: BookableSessionEnum
}

export interface Booking extends BookingProps {
    id: number
}
