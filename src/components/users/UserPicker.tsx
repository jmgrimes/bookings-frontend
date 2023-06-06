import { ChangeEvent, FunctionComponent } from "react"
import { FormSelect } from "react-bootstrap"

import { Consumer } from "~support"

import { User } from "./types"

interface UserPickerProps {
    users: User[]
    user?: User
    setUser: Consumer<User>
}

const UserPicker: FunctionComponent<UserPickerProps> = ({ users, user, setUser }) => {
    const changeUser = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(event.target.value, 10)
        const selectedUser = users.find(u => u.id === selectedUserId) as User
        await setUser(selectedUser)
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
