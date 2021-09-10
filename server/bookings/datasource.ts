import {RESTDataSource} from "apollo-datasource-rest"

import {BookableSession} from "../bookables/datasource";

export type BookingModel = {
  bookerId: number
  bookableId: number
  title: string
  date: string
  session: BookableSession
  notes?: string
}

export type Booking = {id: number} & BookingModel

export type BookingsQuery = {
  bookerId?: number
  bookableId?: number
  startDate?: string
  endDate?: string
}

export class BookingAPI extends RESTDataSource {
  constructor(baseURL: string) {
    super()
    this.baseURL = baseURL
  }

  getBookings(query: BookingsQuery): Promise<Booking[]> {
    const searchParams = {
      bookerId: query.bookerId,
      bookableId: query.bookableId,
      date_gte: query.startDate,
      date_lte: query.endDate
    };
    if (!query.bookerId) delete searchParams.bookerId
    if (!query.bookableId) delete searchParams.bookableId
    if (!query.startDate) delete searchParams.date_gte
    if (!query.endDate) delete searchParams.date_lte
    return this.get<Booking[]>(`/bookings`, searchParams)
  }

  getBooking(id: number): Promise<Booking> {
    return this.get<Booking>(`/bookings/${id.toString(10)}`)
  }

  async createBooking(model: BookingModel): Promise<number> {
    const response = await this.post<Booking>(`/bookings`, model)
    return response.id
  };

  async deleteBooking(id: number): Promise<number> {
    await this.delete(`/bookings/${id.toString(10)}`)
    return id
  };

  async updateBooking(booking: Booking): Promise<number> {
    await this.put(`/bookings/${booking.id.toString(10)}`, booking)
    return booking.id
  }
}