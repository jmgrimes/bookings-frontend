import { gql, useQuery } from "@apollo/client"

import { IUserView } from "~/features/models/users"

interface IUseUserView {
    user?: IUserView
}

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

export default function useUser(id: number) {
    return useQuery<IUseUserView>(UseUserQuery, {
        variables: {
            id,
        },
    })
}
