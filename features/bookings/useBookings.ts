import {QueryResult, gql, useQuery} from "@apollo/client"

import {Booking} from "./booking"
import {Bookable} from "../bookables";
import {DateTime} from "luxon";

type UseBookingsData = {
  bookings: Booking[]
}

type UseBookings = (bookable: Bookable, startDate: DateTime, endDate: DateTime) => QueryResult<UseBookingsData>

export const UseBookingsQuery = gql`
    query useBookings($bookerId: Int, $bookableId: Int, $startDate: String, $endDate: String) {
        bookings(bookerId: $bookerId, bookableId: $bookableId, startDate: $startDate, endDate: $endDate) {
            id
            booker {
                id
                name
                title
                img
                notes
            }
            bookerId
            bookable {
                id
                group
                title
                days
                sessions
                notes
            }
            bookableId
            date
            session
            title
            notes
        }
    }
`

export const useBookings: UseBookings = (bookable: Bookable, startDate: DateTime, endDate: DateTime) => {
  return useQuery<UseBookingsData>(UseBookingsQuery, {
    variables: {
      bookableId: bookable.id,
      startDate: startDate.toISODate(),
      endDate: endDate.toISODate()
    }
  })
}