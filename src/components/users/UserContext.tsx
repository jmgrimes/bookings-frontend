"use client"

import { createContext, PropsWithChildren, useState } from "react"

import { User } from "~/features/models/users"
import { Consumer } from "~/features/support"

export interface UserContext {
    user: User | undefined
    setUser: Consumer<User>
}

const UserContext = createContext<UserContext>({
    user: undefined,
    setUser: () => {},
})

type SessionUserProviderProps = PropsWithChildren<Record<never, string>>

export function UserProvider(props: SessionUserProviderProps) {
    const { children } = props
    const [user, setUser] = useState<User>()
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const UserConsumer = UserContext.Consumer
