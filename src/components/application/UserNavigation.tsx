"use client"

import { UserConsumer, UserPicker } from "~/components/users"
import { User } from "~/features/models/users"

export interface UserNavigationProps {
    users: User[]
}

export default function UserNavigation(props: UserNavigationProps) {
    const users = props.users
    return (
        <UserConsumer>
            {userContext => {
                const { user, setUser } = userContext
                return <UserPicker users={users} user={user} setUser={setUser} />
            }}
        </UserConsumer>
    )
}
