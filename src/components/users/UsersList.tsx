import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"

import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface UsersListProps {
    user?: IUserView
    users: IUserView[]
    onSelect?: Consumer<IUserView>
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
