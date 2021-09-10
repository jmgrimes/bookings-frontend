import {RESTDataSource} from "apollo-datasource-rest"

export interface IBookingModel {
  bookerId: number
  bookableId: number
  title: string
  date: string
  session: number
  notes: string | undefined
}

export interface IBooking extends IBookingModel {
  id: number
}

export interface IBookingsQuery {
  bookerId: number | undefined
  bookableId: number | undefined
  startDate: string | undefined
  endDate: string | undefined
}

export interface IBookingAPI {
  getBookings: (query: IBookingsQuery) => Promise<IBooking[]>
  getBooking: (id: number) => Promise<IBooking>
  createBooking: (model: IBookingModel) => Promise<number>
  deleteBooking: (id: number) => Promise<number>
  updateBooking: (booking: IBooking) => Promise<number>
}

export class BookingAPI extends RESTDataSource implements IBookingAPI {
  constructor(baseURL: string) {
    super()
    this.baseURL = baseURL
  }

  getBookings(query: IBookingsQuery): Promise<IBooking[]> {
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
    return this.get<IBooking[]>(`/bookings`, searchParams)
  }

  getBooking(id: number): Promise<IBooking> {
    return this.get<IBooking>(`/bookings/${id.toString(10)}`)
  }

  async createBooking(model: IBookingModel): Promise<number> {
    const response = await this.post<IBooking>(`/bookings`, model)
    return response.id
  };

  async deleteBooking(id: number): Promise<number> {
    await this.delete(`/bookings/${id.toString(10)}`)
    return id
  };

  async updateBooking(booking: IBooking): Promise<number> {
    await this.put(`/bookings/${booking.id.toString(10)}`, booking)
    return booking.id
  }
}