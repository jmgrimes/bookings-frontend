import {FetchResult, MutationResult, gql, useApolloClient, useMutation} from "@apollo/client"

import {Bookable} from "./bookable"
import {UseBookableQuery} from "./useBookable";
import {UseBookablesQuery} from "./useBookables";

type OnSuccess = (id: number) => void

type UseUpdateBookableData = {
  updateBookable: number
}

type UseUpdateBookableMutate = (bookable: Bookable) => Promise<FetchResult<UseUpdateBookableData>>

type UseUpdateBookable = (onSuccess: OnSuccess) => [UseUpdateBookableMutate, MutationResult<UseUpdateBookableData>]

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
            title: $title 
            group: $group 
            notes: $notes 
            days: $days
            sessions: $sessions
        )
    }
`

export const useUpdateBookable: UseUpdateBookable = (onSuccess: OnSuccess) => {
  const client = useApolloClient();
  const [mutate, result] = useMutation<UseUpdateBookableData>(UseUpdateBookableMutation, {
    onCompleted: async (data: UseUpdateBookableData) => {
      await client.refetchQueries({
        include: [UseBookableQuery, UseBookablesQuery]
      })
      onSuccess(data.updateBookable)
    }
  })
  const updateBookable: UseUpdateBookableMutate = async (bookable: Bookable) => {
    return mutate({
      variables: {
        id: bookable.id,
        title: bookable.title,
        group: bookable.group,
        notes: bookable.notes,
        days: bookable.days,
        sessions: bookable.sessions
      }
    })
  }
  return [updateBookable, result]
}