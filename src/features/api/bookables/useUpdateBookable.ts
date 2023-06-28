import { gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookableQuery } from "~/features/api/bookables/useBookable"
import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { IBookableProps, IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface IUpdateBookableView {
    updateBookable: IBookableView
}

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

export default function useUpdateBookable(onSuccess: Consumer<IBookableView>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<IUpdateBookableView>(UseUpdateBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookableQuery, UseBookablesQuery],
            })
            await onSuccess(data.updateBookable)
        },
    })
    async function updateBookable(id: number, props: IBookableProps) {
        return mutate({
            variables: {
                id,
                ...props,
            },
        })
    }
    return [updateBookable, result]
}
