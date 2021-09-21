import {
  QueryResult,
  gql,
  useQuery
} from "@apollo/client"

import {
  Bookable
} from "./bookable"

type UseBookableData = {
  bookable: Bookable
}

type UseBookable = (id: number) => QueryResult<UseBookableData>

export const UseBookableQuery = gql`
    query UseBookable($id: Int!) {
        bookable(id: $id) {
            id
            group
            title
            notes
            days
            sessions
        }
    }
`

const useBookable: UseBookable = (id) => {
  return useQuery<UseBookableData>(UseBookableQuery, {
    variables: {
      id
    }
  })
}

export default useBookable