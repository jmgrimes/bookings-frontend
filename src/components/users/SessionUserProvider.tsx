import { PropsWithChildren, useState } from "react"

import { SessionUserContext, SessionUserSetContext } from "~/components/users/useSessionUser"
import { IUserView } from "~/features/models/users"

type ISessionUserProviderProps = PropsWithChildren<Record<never, string>>

export default function SessionUserProvider(props: ISessionUserProviderProps) {
    const { children } = props
    const [sessionUser, setSessionUser] = useState<IUserView>()
    return (
        <SessionUserContext.Provider value={sessionUser}>
            <SessionUserSetContext.Provider value={setSessionUser}>{children}</SessionUserSetContext.Provider>
        </SessionUserContext.Provider>
    )
}
