import { gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { IBookableProps, IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface ICreateBookableView {
    createBookable: IBookableView
}

export const UseCreateBookableMutation = gql`
    mutation useCreateBookable(
        $title: String!
        $group: String!
        $notes: String
        $days: [BookableDay!]!
        $sessions: [BookableSession!]!
    ) {
        createBookable(props: { title: $title, group: $group, notes: $notes, days: $days, sessions: $sessions }) {
            id
            title
            group
            notes
            days
            sessions
        }
    }
`

export default function useCreateBookable(onSuccess: Consumer<IBookableView>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<ICreateBookableView>(UseCreateBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookablesQuery],
            })
            await onSuccess(data.createBookable)
        },
    })
    async function createBookable(props: IBookableProps) {
        return mutate({
            variables: props,
        })
    }
    return [createBookable, result]
}
