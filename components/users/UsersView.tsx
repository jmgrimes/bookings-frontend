import {Grid} from "@material-ui/core"
import {useRouter} from "next/router"
import {FunctionComponent, ReactNode} from "react"

import {UserDetails} from "./UserDetails"
import {UsersList} from "./UsersList"
import {ViewError, CardLoading, ListLoading} from "../application"
import {User, useUser, useUsers} from "../../features/users"

type UsersViewLayoutProps = {
  sidebarContent: ReactNode
  mainContent: ReactNode
}

type UsersViewReadyProps = {
  users: User[]
}

const UsersViewLayout: FunctionComponent<UsersViewLayoutProps> = (props: UsersViewLayoutProps) => {
  const {sidebarContent, mainContent} = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        {sidebarContent}
      </Grid>
      <Grid item xs={9}>
        {mainContent}
      </Grid>
    </Grid>
  )
}

const UsersViewLoading: FunctionComponent = () => {
  const sidebarContent = <ListLoading/>
  const mainContent = <CardLoading/>
  return <UsersViewLayout sidebarContent={sidebarContent} mainContent={mainContent}/>
}

const UsersViewReady: FunctionComponent<UsersViewReadyProps> = (props: UsersViewReadyProps) => {
  const {users} = props
  const [currentUser] = useUser()
  const router = useRouter()

  const id = parseInt(router.query.id as string, 10)
  const user = (id ? users.find(u => u.id === id) : currentUser) || users[0]

  const sidebarContent = <UsersList users={users} user={user} getUrl={id => `/users/${id}`}/>
  const mainContent = <UserDetails user={user}/>
  return <UsersViewLayout sidebarContent={sidebarContent} mainContent={mainContent}/>
}

export const UsersView: FunctionComponent = () => {
  const {data, loading, error} = useUsers()
  if (loading) {
    return <UsersViewLoading/>
  }
  if (error) {
    const title = "An error occurred while loading users."
    return <ViewError title={title} message={error.message}/>
  }
  if (!data) {
    const title = "An error occurred while loading users."
    const message = "An unexpected error occurred: users were not available when loading completed."
    return <ViewError title={title} message={message}/>
  }
  return <UsersViewReady users={data.users}/>
}