import { gql, useQuery } from "@apollo/client"

import { IBookableView } from "~/features/models/bookables"

interface IGetBookableView {
    bookable: IBookableView
}

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

export default function useBookable(id: number) {
    return useQuery<IGetBookableView>(UseBookableQuery, {
        variables: {
            id,
        },
    })
}
