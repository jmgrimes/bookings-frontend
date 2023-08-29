import { ChangeEvent } from "react"

import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface IUserPickerProps {
    user?: IUserView
    users: IUserView[]
    setUser: Consumer<IUserView>
}

export default function UserPicker(props: IUserPickerProps) {
    const { users, user, setUser } = props
    const changeUser = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(event.target.value, 10)
        const selectedUser = users.find(u => u.id === selectedUserId)
        if (selectedUser) await setUser(selectedUser)
    }

    return (
        <select className="form-select" value={user?.id} onChange={changeUser}>
            {users.map(u => (
                <option key={u.id} value={u.id}>
                    {u.name}
                </option>
            ))}
        </select>
    )
}
