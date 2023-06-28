import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookableQuery } from "~/features/api/bookables/useBookable"
import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { IBookableProps, IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface UseUpdateBookableData {
    updateBookable: IBookableView
}

type UseUpdateBookableMutate = (id: number, props: IBookableProps) => Promise<FetchResult<UseUpdateBookableData>>
type UseUpdateBookableResult = [UseUpdateBookableMutate, MutationResult<UseUpdateBookableData>]
type UseUpdateBookable = (onSuccess: Consumer<IBookableView>) => UseUpdateBookableResult

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
    const updateBookable: UseUpdateBookableMutate = async (id, props) => {
        return mutate({
            variables: {
                id,
                ...props,
            },
        })
    }
    return [updateBookable, result]
}

export default useUpdateBookable
