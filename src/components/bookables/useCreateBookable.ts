import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~support"

import { Bookable } from "./types"
import { UseBookablesQuery } from "./useBookables"

interface UseCreateBookableData {
    createBookable: Bookable
}

type UseCreateBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseCreateBookableData>>

type UseCreateBookableResult = [UseCreateBookableMutate, MutationResult<UseCreateBookableData>]

type UseCreateBookable = (onSuccess: Consumer<Bookable>) => UseCreateBookableResult

export const UseCreateBookableMutation = gql`
    mutation useCreateBookable(
        $title: String!
        $group: String!
        $notes: String
        $days: [BookableDay!]!
        $sessions: [BookableSession!]!
    ) {
        createBookable(title: $title, group: $group, notes: $notes, days: $days, sessions: $sessions) {
            id
            title
            group
            notes
            days
            sessions
        }
    }
`

const useCreateBookable: UseCreateBookable = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseCreateBookableData>(UseCreateBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookablesQuery],
            })
            await onSuccess(data.createBookable)
        },
    })
    const createBookable: UseCreateBookableMutate = async bookable => {
        return mutate({
            variables: {
                title: bookable.title,
                group: bookable.group,
                notes: bookable.notes,
                days: bookable.days,
                sessions: bookable.sessions,
            },
        })
    }
    return [createBookable, result]
}

export default useCreateBookable
