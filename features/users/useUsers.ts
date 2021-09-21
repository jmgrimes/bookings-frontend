import {
  QueryResult,
  gql,
  useQuery
} from "@apollo/client"

import {
  User
} from "./user"

type UseUsersData = {
  users: User[]
}

type UseUsers = () => QueryResult<UseUsersData>

export const UseUsersQuery = gql`
  query useUsers {
    users {
      id
      name
      title
      notes
    }
  }
`

const useUsers: UseUsers = () => {
  return useQuery<UseUsersData>(UseUsersQuery)
}

export default useUsers