"use client"

// TODO Replace client side rendering version of this page with a server side rendered version.

import { UserCard, UsersCard } from "~/components/users"
import { IUser } from "~/features/models/users"

export interface UserViewProps {
    user: IUser
    users: IUser[]
}

export default function UserView(props: UserViewProps) {
    const { user, users } = props
    return (
        <div className="container">
            <div className="row">
                <section className="col col-3">
                    <UsersCard user={user} users={users} onSelect={() => {}} />
                </section>
                <section className="col">
                    <UserCard user={user} />
                </section>
            </div>
        </div>
    )
}
