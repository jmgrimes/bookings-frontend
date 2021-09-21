import {
  FetchResult,
  MutationResult,
  gql,
  useApolloClient,
  useMutation
} from "@apollo/client"

import {
  Bookable
} from "./bookable"
import {
  UseBookablesQuery
} from "./useBookables"

type OnSuccess = (id: number) => void

type UseDeleteBookableData = {
  deleteBookable: number
}

type UseDeleteBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseDeleteBookableData>>

type UseDeleteBookable = (onSuccess: OnSuccess) => [UseDeleteBookableMutate, MutationResult<UseDeleteBookableData>]

const UseDeleteBookableMutation = gql`
    mutation useDeleteBookable($id: Int!) {
        deleteBookable(id: $id)
    }
`

const useDeleteBookable: UseDeleteBookable = (onSuccess) => {
  const client = useApolloClient();
  const [mutate, result] = useMutation<UseDeleteBookableData>(UseDeleteBookableMutation, {
    onCompleted: async (data) => {
      await client.refetchQueries({
        include: [UseBookablesQuery]
      })
      onSuccess(data.deleteBookable)
    }
  })
  const deleteBookable: UseDeleteBookableMutate = async (bookable) => {
    return mutate({
      variables: {
        id: bookable.id
      }
    })
  }
  return [deleteBookable, result]
}

export default useDeleteBookable