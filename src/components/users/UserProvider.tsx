import { FunctionComponent, PropsWithChildren, useState } from "react"

import { User } from "./types"
import { UserContext, UserSetContext } from "./useUser"

type UserProviderProps = PropsWithChildren<Record<never, string>>

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>()
    return (
        <UserContext.Provider value={user}>
            <UserSetContext.Provider value={setUser}>{children}</UserSetContext.Provider>
        </UserContext.Provider>
    )
}

export default UserProvider
