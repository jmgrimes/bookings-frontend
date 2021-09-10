import {Bookable} from "../bookables"
import {User} from "../users"

export type Booking = {
  id: number
  title: string
  date: string
  session: string
  notes?: string
  booker: User
  bookable: Bookable
}