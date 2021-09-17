import {FetchResult, MutationResult, gql, useApolloClient, useMutation} from "@apollo/client"

import {Booking} from "./booking"
import {UseBookingsQuery} from "./useBookings";

type OnSuccess = (booking: Booking) => void

type UseCreateBookingData = {
  createBooking: Booking
}

type UseCreateBookingMutate = (booking: Booking) => Promise<FetchResult<UseCreateBookingData>>

type UseCreateBooking = (onSuccess: OnSuccess) => [UseCreateBookingMutate, MutationResult<UseCreateBookingData>]

export const UseCreateBookingMutation = gql`
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

export const useCreateBooking: UseCreateBooking = (onSuccess: OnSuccess) => {
  const client = useApolloClient();
  const [mutate, result] = useMutation<UseCreateBookingData>(UseCreateBookingMutation, {
    onCompleted: async (data: UseCreateBookingData) => {
      await client.refetchQueries({
        include: [UseBookingsQuery]
      })
      onSuccess(data.createBooking)
    }
  })
  const createBooking: UseCreateBookingMutate = async (booking: Booking) => {
    return mutate({
      variables: {
        bookerId: booking.bookerId,
        bookableId: booking.bookableId,
        date: booking.date,
        session: booking.session,
        title: booking.title,
        notes: booking.notes
      }
    })
  }
  return [createBooking, result]
}