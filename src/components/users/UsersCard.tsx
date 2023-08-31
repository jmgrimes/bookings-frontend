"use client"

import { Button } from "~/components/controls"
import UsersList from "~/components/users/UsersList"
import { User } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface UsersCardProps {
    user: User
    users: User[]
    onSelect: Consumer<User>
}

export default function UsersCard(props: UsersCardProps) {
    const { user, users, onSelect } = props
    const nextUser = async () => {
        const currentIndex = users.findIndex(u => u.id === user.id)
        const nextIndex = (currentIndex + 1) % users.length
        const nextUser = users[nextIndex]
        await onSelect(nextUser)
    }

    const previousUser = async () => {
        const currentIndex = users.findIndex(u => u.id === user.id)
        const previousIndex = (users.length + currentIndex - 1) % users.length
        const previousUser = users[previousIndex]
        await onSelect(previousUser)
    }

    return (
        <div className="card">
            <div className="card-body">
                <UsersList user={user} users={users} onSelect={onSelect} />
            </div>
            <div className="card-footer">
                <div role="group" className={"btn-group w-100"}>
                    <Button variant="previous" onClick={previousUser} />
                    <Button variant="next" onClick={nextUser} />
                </div>
            </div>
        </div>
    )
}
