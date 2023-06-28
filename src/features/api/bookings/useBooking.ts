import { gql, useQuery } from "@apollo/client"

import { IBookingView } from "~/features/models/bookings"

interface IUseBookingView {
    booking?: IBookingView
}

export const UseBookingsQuery = gql`
    query useBookings($id: Int!) {
        booking(id: $id) {
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

export default function useBooking(id: number) {
    return useQuery<IUseBookingView>(UseBookingsQuery, {
        variables: {
            id,
        },
    })
}
