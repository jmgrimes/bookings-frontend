import {FormControl, MenuItem, Select} from "@material-ui/core"
import {ChangeEvent, FunctionComponent, useEffect} from "react"

import {SimpleError, SimpleLoading} from "../application"
import {User, useUser, useUsers} from "../../features/users"

type UserPickerReadyProps = {
  users: User[]
}

const UserPickerReady: FunctionComponent<UserPickerReadyProps> = (props: UserPickerReadyProps) => {
  const {users} = props
  const [user, setUser] = useUser()

  type ChangeEventTarget = {
    name?: string
    value: unknown
  }
  
  type ChangeEventHandler = (event: ChangeEvent<ChangeEventTarget>) => void

  const changeUser: ChangeEventHandler = event => {
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

export const UserPicker: FunctionComponent = () => {
  const {data, loading, error} = useUsers()
  if (loading) {
    return (
      <SimpleLoading/>
    )
  }
  if (error) {
    return (
      <SimpleError message={error.message}/>
    )
  }
  if (!data) {
    return (
      <SimpleError message="Unable to load users."/>
    )
  }
  return (
    <UserPickerReady users={data.users}/>
  )
}