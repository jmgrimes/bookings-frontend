import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"
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

export default class BookingApi extends RESTDataSource implements IBookingApi {
    constructor(baseURL: string, config?: DataSourceConfig) {
        super(config)
        this.baseURL = baseURL
    }

    async getBookings(query: IBookingQuery) {
        const date_gte = query.startDate?.toISODate() || undefined
        const date_lte = query.endDate?.toISODate() || undefined
        const searchParams = {
            bookerId: query.bookerId?.toString(),
            bookableId: query.bookableId?.toString(),
            date_gte,
            date_lte,
        }
        if (!query.bookerId) delete searchParams.bookerId
        if (!query.bookableId) delete searchParams.bookableId
        if (!query.startDate) delete searchParams.date_gte
        if (!query.endDate) delete searchParams.date_lte
        const bookings = await this.get<IBookingResourceProps[]>(`/bookings`, { params: searchParams })
        return bookings.map(booking => new BookingResource(booking))
    }

    async getBooking(id: number) {
        const booking = await this.get<IBookingResourceProps>(`/bookings/${id.toString(10)}`)
        return new BookingResource(booking)
    }

    async createBooking(props: IBookingProps) {
        const booking = await this.post<IBookingResourceProps>(`/bookings`, {
            body: props,
        })
        return new BookingResource(booking)
    }

    async updateBooking(id: number, props: IBookingProps) {
        const booking = await this.put<IBookingResourceProps>(`/bookings/${id.toString(10)}`, {
            body: { id, ...props },
        })
        return new BookingResource(booking)
    }

    async deleteBooking(id: number) {
        await this.delete(`/bookings/${id.toString(10)}`)
        return id
    }
}
