import { Dispatch, SetStateAction, createContext, useContext } from "react";

import { User } from "./user";

type Maybe<T> = T | undefined;
type SetUser = Dispatch<SetStateAction<Maybe<User>>>;
type UseUser = () => [Maybe<User>, SetUser];

const UserContext = createContext<Maybe<User>>(undefined);
const UserSetContext = createContext<Maybe<SetUser>>(undefined);

const useUser: UseUser = () => {
  const user: Maybe<User> = useContext(UserContext);
  const setUser: Maybe<SetUser> = useContext(UserSetContext);
  if (!setUser) {
    throw new Error("user and setUser are missing from context, did you forget to set up a provider?");
  }
  return [user, setUser];
};

export {
  UserContext,
  UserSetContext,
  useUser
};