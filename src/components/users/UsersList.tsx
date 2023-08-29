import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
