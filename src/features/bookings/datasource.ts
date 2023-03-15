"use server"

import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"

type BookableSession = 0 | 1 | 2 | 3 | 4

interface Booking {
    id: number
    bookerId: number
    bookableId: number
    title: string
    date: string
    session: BookableSession
    notes?: string
}

interface BookingsQuery {
    bookerId?: number
    bookableId?: number
    startDate?: string
    endDate?: string
}

type BookingModel = Omit<Booking, "id">

class BookingAPI extends RESTDataSource {
    constructor(baseURL: string, config?: DataSourceConfig) {
        super(config)
        this.baseURL = baseURL
    }

    getBookings(query: BookingsQuery): Promise<Booking[]> {
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
        return this.get<Booking[]>(`/bookings`, { params: searchParams })
    }

    getBooking(id: number): Promise<Booking> {
        return this.get<Booking>(`/bookings/${id.toString(10)}`)
    }

    createBooking(model: BookingModel): Promise<Booking> {
        return this.post<Booking>(`/bookings`, { body: model })
    }

    updateBooking(booking: Booking): Promise<Booking> {
        return this.put<Booking>(`/bookings/${booking.id.toString(10)}`, { body: booking })
    }

    async deleteBooking(id: number): Promise<number> {
        await this.delete(`/bookings/${id.toString(10)}`)
        return id
    }
}

export default BookingAPI
