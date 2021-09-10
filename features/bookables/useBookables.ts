import {QueryResult, gql, useQuery} from "@apollo/client"

import {Bookable} from "./bookable"

type UseBookablesData = {
  bookables: Bookable[]
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

export const useBookables: UseBookables = () => {
  return useQuery<UseBookablesData>(UseBookablesQuery)
}