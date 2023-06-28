import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"

import { IBooking, IBookingProps, IBookingQuery } from "~/features/models/bookings"

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
        const searchParams = {
            bookerId: query.bookerId?.toString(),
            bookableId: query.bookableId?.toString(),
            date_gte: query.startDate,
            date_lte: query.endDate,
        }
        if (!query.bookerId) delete searchParams.bookerId
        if (!query.bookableId) delete searchParams.bookableId
        if (!query.startDate) delete searchParams.date_gte
        if (!query.endDate) delete searchParams.date_lte
        return this.get<IBooking[]>(`/bookings`, { params: searchParams })
    }

    async getBooking(id: number) {
        return this.get<IBooking>(`/bookings/${id.toString(10)}`)
    }

    async createBooking(props: IBookingProps) {
        return this.post<IBooking>(`/bookings`, {
            body: props,
        })
    }

    async updateBooking(id: number, props: IBookingProps) {
        return this.put<IBooking>(`/bookings/${id.toString(10)}`, {
            body: { id, ...props },
        })
    }

    async deleteBooking(id: number) {
        await this.delete(`/bookings/${id.toString(10)}`)
        return id
    }
}
