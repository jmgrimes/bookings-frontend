import {
  FetchResult,
  MutationResult,
  gql,
  useApolloClient,
  useMutation,
} from "@apollo/client"

import {
  Bookable,
} from "./bookable"
import {
  UseBookablesQuery,
} from "./useBookables"

type OnSuccess = (bookable: Bookable) => void

type UseCreateBookableData = {
  createBookable: Bookable
}

type UseCreateBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseCreateBookableData>>

type UseCreateBookable = (onSuccess: OnSuccess) => [UseCreateBookableMutate, MutationResult<UseCreateBookableData>]

export const UseCreateBookableMutation = gql`
    mutation useCreateBookable(
        $title: String! 
        $group: String! 
        $notes: String
        $days: [BookableDay!]! 
        $sessions: [BookableSession!]!
    ) {
        createBookable(
            title: $title
            group: $group 
            notes: $notes 
            days: $days
            sessions: $sessions
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

const useCreateBookable: UseCreateBookable = (onSuccess) => {
  const client = useApolloClient()
  const [mutate, result] = useMutation<UseCreateBookableData>(UseCreateBookableMutation, {
    onCompleted: async (data) => {
      await client.refetchQueries({
        include: [
          UseBookablesQuery,
        ],
      })
      onSuccess(data.createBookable)
    },
  })
  const createBookable: UseCreateBookableMutate = async (bookable) => {
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