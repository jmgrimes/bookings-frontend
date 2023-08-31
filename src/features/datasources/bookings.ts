import { DateTime } from "luxon"

import { BookableSessionEnum } from "~/features/models/bookables"
import { Booking, BookingProps, BookingQuery } from "~/features/models/bookings"

type BookingResourceProps = Omit<Booking, "date"> & {
    date: string
}
class BookingResource implements Booking {
    id: number
    bookerId: number
    bookableId: number
    title: string
    date: DateTime
    session: BookableSessionEnum
    notes?: string

    constructor(props: BookingResourceProps) {
        this.id = props.id
        this.bookerId = props.bookerId
        this.bookableId = props.bookableId
        this.title = props.title
        this.date = DateTime.fromISO(props.date)
        this.session = props.session
        this.notes = props.notes
    }
}

export default class BookingApi {
    private baseURL: string
    constructor(baseURL?: string) {
        this.baseURL = baseURL || "http://localhost:3001"
    }

    async getBookings(query: BookingQuery) {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const date_gte = query.startDate?.toISODate() || undefined
        const date_lte = query.endDate?.toISODate() || undefined
        const searchParams = new URLSearchParams()
        if (query.bookerId) searchParams.append("bookerId", query.bookerId.toString())
        if (query.bookableId) searchParams.append("bookableId", query.bookableId.toString())
        if (date_gte) searchParams.append("date_gte", date_gte)
        if (date_lte) searchParams.append("date_lte", date_lte)
        const response = await fetch(`${this.baseURL}/bookings?{searchParams}`, {
            method: "GET",
            headers,
        })
        const bookings = (await response.json()) as BookingResourceProps[]
        return bookings.map(booking => new BookingResource(booking))
    }

    async getBooking(id: number) {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookings/${id.toString(10)}`)
        const booking = (await response.json()) as BookingResourceProps
        return new BookingResource(booking)
    }

    async createBooking(props: BookingProps) {
        const body = JSON.stringify(props)
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookings`, {
            method: "POST",
            body,
            headers,
        })
        const booking = (await response.json()) as BookingResourceProps
        return new BookingResource(booking)
    }

    async updateBooking(id: number, props: BookingProps) {
        const body = JSON.stringify({ id, ...props })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookings/${id.toString(10)}`, {
            method: "PUT",
            body,
            headers,
        })
        const booking = (await response.json()) as BookingResourceProps
        return new BookingResource(booking)
    }

    async deleteBooking(id: number) {
        await fetch(`${this.baseURL}/bookings/${id.toString(10)}`, { method: "DELETE" })
        return id
    }
}
