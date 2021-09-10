import {Grid} from "@material-ui/core"
import {useRouter} from "next/router"
import {FunctionComponent} from "react"

import {UserDetails} from "./UserDetails"
import {UsersList} from "./UsersList"
import {ViewError, CardLoading, ListLoading} from "../application"
import {User, useUser, useUsers} from "../../features/users"

type UsersViewReadyProps = {
  users: User[]
}

const getUrl = (id: number) => `/users/${id}`

const UsersViewLoading: FunctionComponent = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <ListLoading/>
      </Grid>
      <Grid item xs={9}>
        <CardLoading/>
      </Grid>
    </Grid>
  )
}

const UsersViewReady: FunctionComponent<UsersViewReadyProps> = (props: UsersViewReadyProps) => {
  const {users} = props
  const [currentUser] = useUser()
  const router = useRouter()

  const id = parseInt(router.query.id as string, 10)
  const user = (id ? users.find(u => u.id === id) : currentUser) || users[0]

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <UsersList users={users} user={user} getUrl={getUrl}/>
      </Grid>
      <Grid item xs={9}>
        <UserDetails user={user}/>
      </Grid>
    </Grid>
  )
}

export const UsersView: FunctionComponent = () => {
  const {data, loading, error} = useUsers()
  if (loading) {
    return (
      <UsersViewLoading/>
    )
  }
  if (error) {
    return (
      <ViewError title="An error occurred while loading users." message={error.message}/>
    )
  }
  if (!data) {
    return (
      <ViewError title="An error occurred while loading users."
             message="An unexpected error occurred: users were not available when loading completed."
      />
    )
  }
  return (
    <UsersViewReady users={data.users}/>
  )
}