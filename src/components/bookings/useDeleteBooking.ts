import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~/features/support"

import { Booking } from "./types"
import { UseBookingsQuery } from "./useBookings"

interface UseDeleteBookingData {
    deleteBooking: number
}

type UseDeleteBookingMutate = (booking: Booking) => Promise<FetchResult<UseDeleteBookingData>>

type UseDeleteBookingResult = [UseDeleteBookingMutate, MutationResult<UseDeleteBookingData>]
type UseDeleteBooking = (onSuccess: Consumer<number>) => UseDeleteBookingResult

const UseDeleteBookingMutation = gql`
    mutation useDeleteBooking($id: Int!) {
        deleteBooking(id: $id)
    }
`

const useDeleteBooking: UseDeleteBooking = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseDeleteBookingData>(UseDeleteBookingMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.deleteBooking)
        },
    })
    const deleteBooking: UseDeleteBookingMutate = async booking => {
        return mutate({
            variables: {
                id: booking.id,
            },
        })
    }
    return [deleteBooking, result]
}

export default useDeleteBooking
