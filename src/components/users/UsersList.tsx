import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { User } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface UsersListProps {
    user?: User
    users: User[]
    onSelect?: Consumer<User>
}

export default function UsersList(props: UsersListProps) {
    const { user, users, onSelect } = props
    return (
        <ul className="list-group">
            {users.map(u => (
                <li
                    className={`list-group-item${u.id === user?.id ? " active" : ""}`}
                    key={u.id}
                    onClick={async () => (onSelect ? await onSelect(u) : {})}>
                    <FontAwesomeIcon icon={faPerson} /> {u.name}
                </li>
            ))}
        </ul>
    )
}
