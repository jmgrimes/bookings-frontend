import { gql, useQuery } from "@apollo/client"

import { IBookableView } from "~/features/models/bookables"
import { IBookingView } from "~/features/models/bookings"
import { IUserView } from "~/features/models/users"

interface IUseBookingsView {
    bookings: IBookingView[]
}

export const UseBookingsQuery = gql`
    query useBookings($bookerId: Int, $bookableId: Int, $startDate: String, $endDate: String) {
        bookings(query: { bookerId: $bookerId, bookableId: $bookableId, startDate: $startDate, endDate: $endDate }) {
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

export default function useBookings(
    booker?: IUserView,
    bookable?: IBookableView,
    startDate?: string,
    endDate?: string,
) {
    return useQuery<IUseBookingsView>(UseBookingsQuery, {
        variables: {
            bookerId: booker?.id,
            bookableId: bookable?.id,
            startDate: startDate,
            endDate: endDate,
        },
    })
}
