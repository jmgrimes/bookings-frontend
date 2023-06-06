import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"
import { DateTime } from "luxon"

import { Consumer } from "~support"

import { Booking } from "./types"
import { UseBookingsQuery } from "./useBookings"

type UseCreateBookingData = {
    createBooking: Omit<Booking, "date"> & { date: string }
}

type UseCreateBookingMutate = (booking: Booking) => Promise<FetchResult<UseCreateBookingData>>

type UseCreateBookingResult = [UseCreateBookingMutate, MutationResult<UseCreateBookingData>]

type UseCreateBooking = (onSuccess: Consumer<Booking>) => UseCreateBookingResult

const UseCreateBookingMutation = gql`
    mutation useCreateBooking(
        $bookerId: Int!
        $bookableId: Int!
        $date: String!
        $session: BookableSession!
        $title: String!
        $notes: String
    ) {
        createBooking(
            bookerId: $bookerId
            bookableId: $bookableId
            date: $date
            session: $session
            title: $title
            notes: $notes
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

const useCreateBooking: UseCreateBooking = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseCreateBookingData>(UseCreateBookingMutation, {
        onCompleted: async data => {
            const booking: Booking = {
                ...data.createBooking,
                date: DateTime.fromISO(data.createBooking.date),
            }
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(booking)
        },
    })
    const createBooking: UseCreateBookingMutate = async booking => {
        return mutate({
            variables: {
                bookerId: booking.bookerId,
                bookableId: booking.bookableId,
                date: booking.date.toISODate(),
                session: booking.session,
                title: booking.title,
                notes: booking.notes,
            },
        })
    }
    return [createBooking, result]
}

export default useCreateBooking
