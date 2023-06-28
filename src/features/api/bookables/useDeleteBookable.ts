import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { Consumer } from "~/features/support"

interface UseDeleteBookableData {
    deleteBookable: number
}

type UseDeleteBookableMutate = (id: number) => Promise<FetchResult<UseDeleteBookableData>>
type UseDeleteBookableResult = [UseDeleteBookableMutate, MutationResult<UseDeleteBookableData>]
type UseDeleteBookable = (onSuccess: Consumer<number>) => UseDeleteBookableResult

export const UseDeleteBookableMutation = gql`
    mutation useDeleteBookable($id: Int!) {
        deleteBookable(id: $id)
    }
`

const useDeleteBookable: UseDeleteBookable = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseDeleteBookableData>(UseDeleteBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookablesQuery],
            })
            await onSuccess(data.deleteBookable)
        },
    })
    const deleteBookable: UseDeleteBookableMutate = async id => {
        return mutate({
            variables: {
                id,
            },
        })
    }
    return [deleteBookable, result]
}

export default useDeleteBookable
