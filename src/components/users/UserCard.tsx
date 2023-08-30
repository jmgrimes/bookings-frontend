"use client"

import { Button } from "~/components/controls"
import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface IUserCardProps {
    user: IUserView
    onView?: Consumer<IUserView>
    onEdit?: Consumer<IUserView>
    onDelete?: Consumer<IUserView>
}

export default function UserCard(props: IUserCardProps) {
    const { user, onView, onEdit, onDelete } = props
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
            <div className="card-footer text-center">
                <div role="group" className="btn-group">
                    {onView && <Button variant="view" onClick={() => onView(user)} />}
                    {onEdit && <Button variant="edit" onClick={() => onEdit(user)} />}
                    {onDelete && <Button variant="delete" onClick={() => onDelete(user)} />}
                </div>
            </div>
        </div>
    )
}
