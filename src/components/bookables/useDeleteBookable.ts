import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { Consumer } from "~/features/support"

import { Bookable } from "./types"
import { UseBookablesQuery } from "./useBookables"

interface UseDeleteBookableData {
    deleteBookable: number
}

type UseDeleteBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseDeleteBookableData>>

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
    const deleteBookable: UseDeleteBookableMutate = async bookable => {
        return mutate({
            variables: {
                id: bookable.id,
            },
        })
    }
    return [deleteBookable, result]
}

export default useDeleteBookable
