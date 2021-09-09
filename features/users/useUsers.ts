import { QueryResult, gql, useQuery } from "@apollo/client";

import { User } from "./user";

const query = gql`
  query useUsers {
    users {
      id
      name
      title
      notes
    }
  }
`;

type Data = {
  users: User[];
}
type UseUsers = () => QueryResult<Data>;

export const useUsers: UseUsers = () => {
  return useQuery<Data>(query);
}