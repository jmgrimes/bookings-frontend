import {QueryResult, gql, useQuery} from "@apollo/client"

import {Bookable} from "./bookable"

const query = gql`
  query useBookable($id: Int!) {
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

type Data = {
  bookable: Bookable
}

type UseBookable = (id: number) => QueryResult<Data>

export const useBookable: UseBookable = (id) => {
  return useQuery<Data>(query, {
    variables: {
      id
    }
  })
}