import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~/features/support"

import { Bookable } from "./types"
import { UseBookableQuery } from "./useBookable"
import { UseBookablesQuery } from "./useBookables"

interface UseUpdateBookableData {
    updateBookable: Bookable
}

type UseUpdateBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseUpdateBookableData>>

type UseUpdateBookableResult = [UseUpdateBookableMutate, MutationResult<UseUpdateBookableData>]

type UseUpdateBookable = (onSuccess: Consumer<Bookable>) => UseUpdateBookableResult

export const UseUpdateBookableMutation = gql`
    mutation useUpdateBookable(
        $id: Int!
        $title: String!
        $group: String!
        $notes: String
        $days: [BookableDay!]!
        $sessions: [BookableSession!]!
    ) {
        updateBookable(
            id: $id
            props: { title: $title, group: $group, notes: $notes, days: $days, sessions: $sessions }
        ) {
            id
            title
            group
            notes
            days
            sessions
        }
    }
`

const useUpdateBookable: UseUpdateBookable = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseUpdateBookableData>(UseUpdateBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookableQuery, UseBookablesQuery],
            })
            await onSuccess(data.updateBookable)
        },
    })
    const updateBookable: UseUpdateBookableMutate = async bookable => {
        return mutate({
            variables: {
                id: bookable.id,
                title: bookable.title,
                group: bookable.group,
                notes: bookable.notes,
                days: bookable.days,
                sessions: bookable.sessions,
            },
        })
    }
    return [updateBookable, result]
}

export default useUpdateBookable
