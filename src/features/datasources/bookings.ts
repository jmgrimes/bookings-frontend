import { DateTime } from "luxon"

import { BookableSessionEnum } from "~/features/models/bookables"
import { IBooking, IBookingProps, IBookingQuery } from "~/features/models/bookings"

type IBookingResourceProps = Omit<IBooking, "date"> & {
    date: string
}
class BookingResource implements IBooking {
    id: number
    bookerId: number
    bookableId: number
    title: string
    date: DateTime
    session: BookableSessionEnum
    notes?: string

    constructor(props: IBookingResourceProps) {
        this.id = props.id
        this.bookerId = props.bookerId
        this.bookableId = props.bookableId
        this.title = props.title
        this.date = DateTime.fromISO(props.date)
        this.session = props.session
        this.notes = props.notes
    }
}

export interface IBookingApi {
    getBookings(query: IBookingQuery): Promise<IBooking[]>
    getBooking(id: number): Promise<IBooking>
    createBooking(props: IBookingProps): Promise<IBooking>
    updateBooking(id: number, props: IBookingProps): Promise<IBooking>
    deleteBooking(id: number): Promise<number>
}

export default class BookingApi implements IBookingApi {
    private baseURL: string
    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async getBookings(query: IBookingQuery) {
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
        const bookings = (await response.json()) as IBookingResourceProps[]
        return bookings.map(booking => new BookingResource(booking))
    }

    async getBooking(id: number) {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookings/${id.toString(10)}`)
        const booking = (await response.json()) as IBookingResourceProps
        return new BookingResource(booking)
    }

    async createBooking(props: IBookingProps) {
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
        const booking = (await response.json()) as IBookingResourceProps
        return new BookingResource(booking)
    }

    async updateBooking(id: number, props: IBookingProps) {
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
        const booking = (await response.json()) as IBookingResourceProps
        return new BookingResource(booking)
    }

    async deleteBooking(id: number) {
        await fetch(`${this.baseURL}/bookings/${id.toString(10)}`, { method: "DELETE" })
        return id
    }
}
