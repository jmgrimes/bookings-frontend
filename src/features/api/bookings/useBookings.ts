import { QueryResult, gql, useQuery } from "@apollo/client"

import { IBookableView } from "~/features/models/bookables"
import { IBookingView } from "~/features/models/bookings"

interface UseBookingsData {
    bookings: IBookingView[]
}

type UseBookings = (bookable: IBookableView, startDate: string, endDate: string) => QueryResult<UseBookingsData>

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
            startDate: startDate,
            endDate: endDate,
        },
    })
}

export default useBookings
