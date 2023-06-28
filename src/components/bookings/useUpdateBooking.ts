import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"
import { DateTime } from "luxon"

import { Consumer } from "~/features/support"

import { Booking } from "./types"
import { UseBookingsQuery } from "./useBookings"

interface UseUpdateBookingData {
    updateBooking: Omit<Booking, "date"> & { date: string }
}

type UseUpdateBookingMutate = (booking: Booking) => Promise<FetchResult<UseUpdateBookingData>>

type UseUpdateBookingResult = [UseUpdateBookingMutate, MutationResult<UseUpdateBookingData>]

type UseUpdateBooking = (onSuccess: Consumer<Booking>) => UseUpdateBookingResult

const UseUpdateBookingMutation = gql`
    mutation useUpdateBooking(
        $id: Int!
        $bookerId: Int!
        $bookableId: Int!
        $date: String!
        $session: BookableSession!
        $title: String!
        $notes: String
    ) {
        updateBooking(
            id: $id
            props: {
                bookerId: $bookerId
                bookableId: $bookableId
                date: $date
                session: $session
                title: $title
                notes: $notes
            }
        ) {
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

const useUpdateBooking: UseUpdateBooking = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseUpdateBookingData>(UseUpdateBookingMutation, {
        onCompleted: async data => {
            const booking: Booking = {
                ...data.updateBooking,
                date: DateTime.fromISO(data.updateBooking.date),
            }
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(booking)
        },
    })
    const updateBooking: UseUpdateBookingMutate = async booking => {
        return mutate({
            variables: {
                id: booking.id,
                bookerId: booking.bookerId,
                bookableId: booking.bookableId,
                date: booking.date.toISODate(),
                session: booking.session,
                title: booking.title,
                notes: booking.notes,
            },
        })
    }
    return [updateBooking, result]
}

export default useUpdateBooking
