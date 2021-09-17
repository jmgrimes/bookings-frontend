import {Bookable, BookableDayModel, BookableSessionEnum, BookableSessionModel} from "../bookables"
import {User} from "../users"

export type Booking = {
  id: number
  booker?: User
  bookerId: number
  bookable?: Bookable
  bookableId: number
  date: string
  session: BookableSessionEnum
  title: string
  notes?: string
}

export class BookingModel {
  id: number
  bookerId: number
  date: string
  session: BookableSessionEnum
  title: string
  notes?: string

  constructor(
    id: number,
    bookerId: number,
    date: string,
    session: BookableSessionEnum,
    title: string = "",
    notes?: string
  ) {
    this.id = id
    this.bookerId = bookerId
    this.date = date
    this.session = session
    this.title = title
    this.notes = notes
  }

  toBooking(bookable: Bookable): Booking {
    const booking: Booking = {
      id: this.id,
      bookerId: this.bookerId,
      bookableId: bookable.id,
      date: this.date,
      session: this.session,
      title: this.title,
      notes: this.notes
    }
    return booking
  }
  
  static fromBooking(booking: Booking) {
    return new BookingModel(
      booking.id,
      booking.bookerId,
      booking.date,
      booking.session,
      booking.title,
      booking.notes
    )
  }
  
  static fromSessionOnDay(day: BookableDayModel, session: BookableSessionModel, booker?: User) {
    return new BookingModel(
      0,
      booker?.id || 0,
      day.date.toISODate(),
      session.session
    )
  }
}
