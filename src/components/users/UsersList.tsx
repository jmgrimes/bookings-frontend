import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"

import { AsyncConsumer, Consumer } from "~components/application/functions"

import { User } from "./types"

type UsersListProps = {
    user?: User
    users: User[]
    onSelect?: AsyncConsumer<User> | Consumer<User>
}

const UsersList: FunctionComponent<UsersListProps> = ({ user, users, onSelect }) => {
    return (
        <ListGroup>
            {users.map(u => (
                <ListGroup.Item key={u.id} active={u.id === user?.id} onClick={() => (onSelect ? onSelect(u) : {})}>
                    <Person /> {u.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default UsersList
