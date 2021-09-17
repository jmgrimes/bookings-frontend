import {FetchResult, MutationResult, gql, useApolloClient, useMutation} from "@apollo/client"

import {Bookable} from "./bookable"
import {UseBookablesQuery} from "./useBookables";

type OnSuccess = (id: number) => void

type UseDeleteBookableData = {
  deleteBookable: number
}

type UseDeleteBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseDeleteBookableData>>

type UseDeleteBookable = (onSuccess: OnSuccess) => [UseDeleteBookableMutate, MutationResult<UseDeleteBookableData>]

export const UseDeleteBookableMutation = gql`
    mutation useDeleteBookable($id: Int!) {
        deleteBookable(id: $id)
    }
`

export const useDeleteBookable: UseDeleteBookable = (onSuccess: OnSuccess) => {
  const client = useApolloClient();
  const [mutate, result] = useMutation<UseDeleteBookableData>(UseDeleteBookableMutation, {
    onCompleted: async (data: UseDeleteBookableData) => {
      await client.refetchQueries({
        include: [UseBookablesQuery]
      })
      onSuccess(data.deleteBookable)
    }
  })
  const deleteBookable: UseDeleteBookableMutate = async (bookable: Bookable) => {
    return mutate({
      variables: {
        id: bookable.id
      }
    })
  }
  return [deleteBookable, result]
}