import { QueryResult, gql, useQuery } from "@apollo/client";

import { Bookable } from "./bookable";

const query = gql`
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
`;

type Data = {
  bookables: Bookable[];
}
type UseBookables = () => QueryResult<Data>;

export const useBookables: UseBookables = () => {
  return useQuery<Data>(query);
}