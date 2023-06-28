import { ChangeEvent, FunctionComponent } from "react"
import { FormSelect } from "react-bootstrap"

import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface UserPickerProps {
    user?: IUserView
    users: IUserView[]
    setUser: Consumer<IUserView>
}

const UserPicker: FunctionComponent<UserPickerProps> = ({ users, user, setUser }) => {
    const changeUser = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(event.target.value, 10)
        const selectedUser = users.find(u => u.id === selectedUserId)
        if (selectedUser) await setUser(selectedUser)
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
