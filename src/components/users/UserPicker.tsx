import { ChangeEvent, FunctionComponent } from "react"
import { FormSelect } from "react-bootstrap"

import { AsyncConsumer, Consumer } from "~components/application/functions"

import { User } from "./types"

interface UserPickerProps {
    users: User[]
    user?: User
    setUser: AsyncConsumer<User> | Consumer<User>
}

const UserPicker: FunctionComponent<UserPickerProps> = ({ users, user, setUser }) => {
    const changeUser = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(event.target.value, 10)
        const selectedUser = users.find(u => u.id === selectedUserId) as User
        setUser(selectedUser)
    }

    return (
        <FormSelect value={user?.id} onChange={changeUser}>
            {users.map(u => (
                <option key={u.id} value={u.id}>
                    {u.name}
                </option>
            ))}
        </FormSelect>
    )
}

export default UserPicker
