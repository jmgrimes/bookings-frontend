import { gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"
import { IBookingProps, IBookingView } from "~/features/models/bookings"
import { Consumer } from "~/features/support"

interface IUpdateBookingView {
    updateBooking: IBookingView
}

const UseUpdateBookingMutation = gql`
    mutation useUpdateBooking(
        $id: Int!
        $bookerId: Int!
        $bookableId: Int!
        $date: DateTime!
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

export default function useUpdateBooking(onSuccess: Consumer<IBookingView>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<IUpdateBookingView>(UseUpdateBookingMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.updateBooking)
        },
    })
    async function updateBooking(id: number, props: IBookingProps) {
        return mutate({
            variables: {
                id,
                ...props,
            },
        })
    }
    return [updateBooking, result]
}
