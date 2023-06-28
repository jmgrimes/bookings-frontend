import { gql, useQuery } from "@apollo/client"

import { IUserView } from "~/features/models/users"

interface IUseUsersView {
    users: IUserView[]
}

export const UseUsersQuery = gql`
    query useUsers {
        users {
            id
            name
            title
            img
            notes
        }
    }
`

export default function useUsers() {
    return useQuery<IUseUsersView>(UseUsersQuery)
}
