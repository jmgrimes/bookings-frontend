import { gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"
import { IBookingProps, IBookingView } from "~/features/models/bookings"
import { Consumer } from "~/features/support"

type ICreateBookingView = {
    createBooking: IBookingView
}

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

export default function useCreateBooking(onSuccess: Consumer<IBookingView>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<ICreateBookingView>(UseCreateBookingMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.createBooking)
        },
    })
    async function createBooking(props: IBookingProps) {
        return mutate({
            variables: props,
        })
    }
    return [createBooking, result]
}
