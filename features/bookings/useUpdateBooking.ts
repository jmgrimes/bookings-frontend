import {FetchResult, MutationResult, gql, useApolloClient, useMutation} from "@apollo/client"

import {Booking} from "./booking"
import {UseBookingsQuery} from "./useBookings";
import {DateTime} from "luxon";

type OnSuccess = (booking: Booking) => void

type UseUpdateBookingData = {
  updateBooking: Omit<Booking, "date"> & {date: string}
}

type UseUpdateBookingMutate = (booking: Booking) => Promise<FetchResult<UseUpdateBookingData>>

type UseUpdateBooking = (onSuccess: OnSuccess) => [UseUpdateBookingMutate, MutationResult<UseUpdateBookingData>]

export const UseUpdateBookingMutation = gql`
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

export const useUpdateBooking: UseUpdateBooking = (onSuccess: OnSuccess) => {
  const client = useApolloClient();
  const [mutate, result] = useMutation<UseUpdateBookingData>(UseUpdateBookingMutation, {
    onCompleted: async (data: UseUpdateBookingData) => {
      const booking: Booking = {
        ...data.updateBooking,
        date: DateTime.fromISO(data.updateBooking.date)
      }
      await client.refetchQueries({
        include: [UseBookingsQuery]
      })
      onSuccess(booking)
    }
  })
  const updateBooking: UseUpdateBookingMutate = async (booking: Booking) => {
    return mutate({
      variables: {
        id: booking.id,
        bookerId: booking.bookerId,
        bookableId: booking.bookableId,
        date: booking.date.toISODate(),
        session: booking.session,
        title: booking.title,
        notes: booking.notes
      }
    })
  }
  return [updateBooking, result]
}