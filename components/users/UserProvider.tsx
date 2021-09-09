import {FunctionComponent, ReactNode, useState} from "react";

import { User, UserContext, UserSetContext } from "../../features/users";

type UserProviderProps = {
  children?: ReactNode[]
};

export const UserProvider: FunctionComponent<UserProviderProps> = (props: UserProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
};