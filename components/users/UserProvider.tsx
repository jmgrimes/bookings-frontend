import {FunctionComponent, ReactNode, useState} from "react";

import { User, UserContext, UserSetContext } from "../../features/users";

type UserProviderProps = {
  children?: ReactNode[]
};

export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
};