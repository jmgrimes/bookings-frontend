import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Booking } from "./types"
import { UseBookingsQuery } from "./useBookings"

type OnSuccess = (id: number) => void

type UseDeleteBookingData = {
    deleteBooking: number
}

type UseDeleteBookingMutate = (booking: Booking) => Promise<FetchResult<UseDeleteBookingData>>

type UseDeleteBooking = (onSuccess: OnSuccess) => [UseDeleteBookingMutate, MutationResult<UseDeleteBookingData>]

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
            onSuccess(data.deleteBooking)
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
