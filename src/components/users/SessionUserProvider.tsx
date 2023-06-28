import { FunctionComponent, PropsWithChildren, useState } from "react"

import { SessionUserContext, SessionUserSetContext } from "~/features/api/users"
import { IUserView } from "~/features/models/users"

type SessionUserProviderProps = PropsWithChildren<Record<never, string>>

const SessionUserProvider: FunctionComponent<SessionUserProviderProps> = ({ children }) => {
    const [sessionUser, setSessionUser] = useState<IUserView>()
    return (
        <SessionUserContext.Provider value={sessionUser}>
            <SessionUserSetContext.Provider value={setSessionUser}>{children}</SessionUserSetContext.Provider>
        </SessionUserContext.Provider>
    )
}

export default SessionUserProvider
