import { QueryResult, gql, useQuery } from "@apollo/client"
import { DateTime } from "luxon"

import { Bookable } from "~components/bookables"

import { Booking } from "./types"

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

const useBookings: UseBookings = (bookable, startDate, endDate) => {
    return useQuery<UseBookingsData>(UseBookingsQuery, {
        variables: {
            bookableId: bookable.id,
            startDate: startDate.toISODate(),
            endDate: endDate.toISODate(),
        },
    })
}

export default useBookings
