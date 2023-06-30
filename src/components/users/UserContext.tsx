"use client"

import { createContext, PropsWithChildren, useState } from "react"

import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

export interface IUserContext {
    user: IUserView | undefined
    setUser: Consumer<IUserView>
}

const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => {},
})

type ISessionUserProviderProps = PropsWithChildren<Record<never, string>>

export function UserProvider(props: ISessionUserProviderProps) {
    const { children } = props
    const [user, setUser] = useState<IUserView>()
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const UserConsumer = UserContext.Consumer
