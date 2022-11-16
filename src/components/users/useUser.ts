import { Dispatch, SetStateAction, createContext, useContext } from "react"

import { User } from "./types"

type SetUser = Dispatch<SetStateAction<User | undefined>>
type UseUser = () => [User | undefined, SetUser]

export const UserContext = createContext<User | undefined>(undefined)
export const UserSetContext = createContext<SetUser | undefined>(undefined)

const useUser: UseUser = () => {
    const user = useContext(UserContext)
    const setUser = useContext(UserSetContext)
    if (!setUser) {
        throw new Error("user and setUser are missing from context, did you forget to set up a provider?")
    }
    return [user, setUser]
}

export default useUser
