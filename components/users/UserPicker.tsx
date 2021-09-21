import {
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core"
import {
  ChangeEvent,
  FunctionComponent,
  useEffect
} from "react"

import {
  Error,
  Loading
} from "../application"
import {
  User,
  useUser,
  useUsers
} from "../../features/users"

type UserPickerReadyProps = {
  users: User[]
}

const UserPickerReady: FunctionComponent<UserPickerReadyProps> = (props) => {
  const {users} = props
  const [user, setUser] = useUser()

  const changeUser = (event: ChangeEvent<{name?: string, value: unknown}>) => {
    const selectedUserId = parseInt(event.target.value as string, 10)
    const selectedUser = users.find(u => u.id === selectedUserId)
    setUser(selectedUser)
  };

  useEffect(
    () => {
      setUser(users[0])
    },
    [users, setUser]
  )

  return (
    <FormControl>
      <Select value={user?.id || ""} onChange={changeUser}>
        {
          users.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}

const UserPicker: FunctionComponent = () => {
  const {data, loading, error} = useUsers()
  if (loading) {
    return <Loading/>
  }
  if (error) {
    return <Error message={error.message}/>
  }
  if (!data) {
    return <Error message="Unable to load users."/>
  }
  return <UserPickerReady users={data.users}/>
}

export default UserPicker