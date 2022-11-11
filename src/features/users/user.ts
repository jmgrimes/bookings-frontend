import { Booking } from "../bookings"

export type User = {
    id: number
    name: string
    title: string
    img?: string
    notes?: string
    bookings?: Booking[]
}

export type UserAction = (user: User) => Promise<void> | void
