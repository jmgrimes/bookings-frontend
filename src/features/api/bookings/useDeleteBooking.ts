import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~/features/support"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"

interface UseDeleteBookingData {
    deleteBooking: number
}

type UseDeleteBookingMutate = (id: number) => Promise<FetchResult<UseDeleteBookingData>>
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
    const deleteBooking: UseDeleteBookingMutate = async id => {
        return mutate({
            variables: {
                id,
            },
        })
    }
    return [deleteBooking, result]
}

export default useDeleteBooking
