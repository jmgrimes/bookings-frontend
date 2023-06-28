import { FetchResult, MutationResult, gql, useApolloClient, useMutation } from "@apollo/client"

import { UseBookablesQuery } from "~/features/api/bookables/useBookables"
import { IBookableProps, IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface UseCreateBookableData {
    createBookable: IBookableView
}

type UseCreateBookableMutate = (props: IBookableProps) => Promise<FetchResult<UseCreateBookableData>>
type UseCreateBookableResult = [UseCreateBookableMutate, MutationResult<UseCreateBookableData>]
type UseCreateBookable = (onSuccess: Consumer<IBookableView>) => UseCreateBookableResult

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

const useCreateBookable: UseCreateBookable = onSuccess => {
    const client = useApolloClient()
    const [mutate, result] = useMutation<UseCreateBookableData>(UseCreateBookableMutation, {
        onCompleted: async data => {
            await client.refetchQueries({
                include: [UseBookablesQuery],
            })
            await onSuccess(data.createBookable)
        },
    })
    const createBookable: UseCreateBookableMutate = async props => {
        return mutate({
            variables: props,
        })
    }
    return [createBookable, result]
}

export default useCreateBookable
