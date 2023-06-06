import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"

import { Consumer } from "~support"

import { User } from "./types"

interface UsersListProps {
    user?: User
    users: User[]
    onSelect?: Consumer<User>
}

const UsersList: FunctionComponent<UsersListProps> = ({ user, users, onSelect }) => {
    return (
        <ListGroup>
            {users.map(u => (
                <ListGroup.Item
                    key={u.id}
                    active={u.id === user?.id}
                    onClick={async () => (onSelect ? await onSelect(u) : {})}>
                    <Person /> {u.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default UsersList
