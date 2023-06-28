import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"
import { IBookingProps, IBookingView } from "~/features/models/bookings"
import { Consumer } from "~/features/support"

interface UseUpdateBookingData {
    updateBooking: IBookingView
}

type UseUpdateBookingMutate = (id: number, props: IBookingProps) => Promise<FetchResult<UseUpdateBookingData>>
type UseUpdateBookingResult = [UseUpdateBookingMutate, MutationResult<UseUpdateBookingData>]
type UseUpdateBooking = (onSuccess: Consumer<IBookingView>) => UseUpdateBookingResult

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
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.updateBooking)
        },
    })
    const updateBooking: UseUpdateBookingMutate = async (id, props) => {
        return mutate({
            variables: {
                id,
                ...props,
            },
        })
    }
    return [updateBooking, result]
}

export default useUpdateBooking
