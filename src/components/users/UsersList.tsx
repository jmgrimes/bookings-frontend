import { ListGroup } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"

import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface IUsersListProps {
    user?: IUserView
    users: IUserView[]
    onSelect?: Consumer<IUserView>
}

export default function UsersList(props: IUsersListProps) {
    const { user, users, onSelect } = props
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
