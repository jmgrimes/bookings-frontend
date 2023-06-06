import { Dispatch, SetStateAction, createContext, useContext } from "react"

import { User } from "./types"

type SetSessionUser = Dispatch<SetStateAction<User | undefined>>
type UseSessionUser = () => [User | undefined, SetSessionUser]

export const SessionUserContext = createContext<User | undefined>(undefined)
export const SessionUserSetContext = createContext<SetSessionUser | undefined>(undefined)

const useSessionUser: UseSessionUser = () => {
    const sessionUser = useContext(SessionUserContext)
    const setSessionUser = useContext(SessionUserSetContext)
    if (!setSessionUser) {
        throw new Error("sessionUser and setSessionUser are missing from context, did you forget to set up a provider?")
    }
    return [sessionUser, setSessionUser]
}

export default useSessionUser
