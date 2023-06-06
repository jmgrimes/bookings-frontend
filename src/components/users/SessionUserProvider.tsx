import { FunctionComponent, PropsWithChildren, useState } from "react"

import { User } from "./types"
import { SessionUserContext, SessionUserSetContext } from "./useSessionUser"

type SessionUserProviderProps = PropsWithChildren<Record<never, string>>

const SessionUserProvider: FunctionComponent<SessionUserProviderProps> = ({ children }) => {
    const [sessionUser, setSessionUser] = useState<User>()
    return (
        <SessionUserContext.Provider value={sessionUser}>
            <SessionUserSetContext.Provider value={setSessionUser}>{children}</SessionUserSetContext.Provider>
        </SessionUserContext.Provider>
    )
}

export default SessionUserProvider
