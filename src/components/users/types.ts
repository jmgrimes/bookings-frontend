import { Booking } from "../bookings"

export interface User {
    id: number
    name: string
    title: string
    img?: string
    notes?: string
    bookings?: Booking[]
}
