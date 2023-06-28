import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookingsQuery } from "~/features/api/bookings/useBookings"
import { IBookingProps, IBookingView } from "~/features/models/bookings"
import { Consumer } from "~/features/support"

type UseCreateBookingData = {
    createBooking: IBookingView
}

type UseCreateBookingMutate = (props: IBookingProps) => Promise<FetchResult<UseCreateBookingData>>
type UseCreateBookingResult = [UseCreateBookingMutate, MutationResult<UseCreateBookingData>]
type UseCreateBooking = (onSuccess: Consumer<IBookingView>) => UseCreateBookingResult

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

const useCreateBooking: UseCreateBooking = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseCreateBookingData>(UseCreateBookingMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookingsQuery],
            })
            await onSuccess(data.createBooking)
        },
    })
    const createBooking: UseCreateBookingMutate = async props => {
        return mutate({
            variables: props,
        })
    }
    return [createBooking, result]
}

export default useCreateBooking
