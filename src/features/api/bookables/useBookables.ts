import { gql, useQuery } from "@apollo/client"

import { IBookableView } from "~/features/models/bookables"

interface IGetBookablesView {
    bookables: IBookableView[]
}

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

export default function useBookables() {
    return useQuery<IGetBookablesView>(UseBookablesQuery)
}
