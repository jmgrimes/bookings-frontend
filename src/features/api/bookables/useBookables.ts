import { QueryResult, gql, useQuery } from "@apollo/client"

import { IBookableView } from "~/features/models/bookables"

interface UseBookablesData {
    bookables: IBookableView[]
}

type UseBookables = () => QueryResult<UseBookablesData>

export const UseBookablesQuery = gql`
    query useBookables {
        bookables {
            id
            group
            title
            notes
            days
            sessions
        }
    }
`

const useBookables: UseBookables = () => {
    return useQuery<UseBookablesData>(UseBookablesQuery)
}

export default useBookables
