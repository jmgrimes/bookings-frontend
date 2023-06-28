import { QueryResult, gql, useQuery } from "@apollo/client"

import { IBookingView } from "~/features/models/bookings"

interface UseBookingData {
    booking?: IBookingView
}

type UseBooking = (id: number) => QueryResult<UseBookingData>

export const UseBookingsQuery = gql`
    query useBookings($id: Int!) {
        bookings(id: $id) {
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

const useBooking: UseBooking = id => {
    return useQuery<UseBookingData>(UseBookingsQuery, {
        variables: {
            id,
        },
    })
}

export default useBooking
