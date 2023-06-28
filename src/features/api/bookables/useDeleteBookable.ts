import { gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { Consumer } from "~/features/support"

interface IDeleteBookableView {
    deleteBookable: number
}

export const UseDeleteBookableMutation = gql`
    mutation useDeleteBookable($id: Int!) {
        deleteBookable(id: $id)
    }
`

export default function useDeleteBookable(onSuccess: Consumer<number>) {
    const client = useApolloClient()
    const [mutate, result] = useMutation<IDeleteBookableView>(UseDeleteBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookablesQuery],
            })
            await onSuccess(data.deleteBookable)
        },
    })
    async function deleteBookable(id: number) {
        return mutate({
            variables: {
                id,
            },
        })
    }
    return [deleteBookable, result]
}
