import { gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~/features/support"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"

interface IDeleteBookingView {
    deleteBooking: number
}

const UseDeleteBookingMutation = gql`
    mutation useDeleteBooking($id: Int!) {
        deleteBooking(id: $id)
    }
`

export default function useDeleteBooking(onSuccess: Consumer<number>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<IDeleteBookingView>(UseDeleteBookingMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.deleteBooking)
        },
    })
    async function deleteBooking(id: number) {
        return mutate({
            variables: {
                id,
            },
        })
    }
    return [deleteBooking, result]
}
