import { Dispatch, SetStateAction, createContext, useContext } from "react"

import { IUserView } from "~/features/models/users"

type SetSessionUser = Dispatch<SetStateAction<IUserView | undefined>>

export const SessionUserContext = createContext<IUserView | undefined>(undefined)
export const SessionUserSetContext = createContext<SetSessionUser | undefined>(undefined)

export default function useSessionUser() {
    const sessionUser = useContext(SessionUserContext)
    const setSessionUser = useContext(SessionUserSetContext)
    if (!setSessionUser) {
        throw new Error("sessionUser and setSessionUser are missing from context, did you forget to set up a provider?")
    }
    return [sessionUser, setSessionUser] as [IUserView | undefined, SetSessionUser]
}
