"use client"

import { User } from "~/features/models/users"

export interface UserCardProps {
    user: User
}

export default function UserCard(props: UserCardProps) {
    const { user } = props
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title h5">{user.name}</h5>
                <h6 className="card-subtitle h6">{user.title}</h6>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle h6 mb-2">Notes</h6>
                <p className="card-text">{user.notes}</p>
            </div>
        </div>
    )
}
