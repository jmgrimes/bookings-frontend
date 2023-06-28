import { QueryResult, gql, useQuery } from "@apollo/client"

import { IUserView } from "~/features/models/users"

interface UseUserData {
    user?: IUserView
}

type UseUser = (id: number) => QueryResult<UseUserData>

export const UseUserQuery = gql`
    query useUser($id: Int!) {
        user(id: $id) {
            id
            name
            title
            img
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
