import { QueryResult, gql, useQuery } from "@apollo/client"

import { User } from "./types"

interface UseUserData {
    users: User | undefined
}

type UseUser = (id: number) => QueryResult<UseUserData>

export const UseUserQuery = gql`
    query useUser($id: Int!) {
        users(id: $id) {
            id
            name
            title
            notes
        }
    }
`

const useUser: UseUser = id => {
    return useQuery<UseUserData>(UseUserQuery, {
        variables: {
            id,
        },
    })
}

export default useUser
