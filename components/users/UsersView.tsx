import {
  useRouter
} from "next/router";
import {
  FunctionComponent
} from "react"

import {
  ErrorView,
  Layout,
  LoadingCard,
  LoadingList
} from "../application"
import {
  User,
  useUser,
  useUsers
} from "../../features/users"

import UserDetails from "./UserDetails"
import UsersList from "./UsersList"

const UsersViewLoading: FunctionComponent = () => {
  const sidebar = <LoadingList/>
  const main = <LoadingCard/>
  return <Layout sidebar={sidebar} main={main}/>
}

type UsersViewReadyProps = {
  users: User[]
}

export const UsersViewReady: FunctionComponent<UsersViewReadyProps> = (props) => {
  const {users} = props
  const [currentUser] = useUser()
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const user = (id ? users.find(u => u.id === id) : currentUser) || users[0]
  const sidebar = <UsersList users={users} user={user} getUrl={id => `/users/${id}`}/>
  const main = <UserDetails user={user}/>
  return <Layout sidebar={sidebar} main={main}/>
}

const UsersView: FunctionComponent = () => {
  const {data, loading, error} = useUsers()
  if (loading) {
    return <UsersViewLoading/>
  }
  if (error) {
    const title = "An error occurred while loading users."
    return <ErrorView title={title} message={error.message}/>
  }
  if (!data) {
    const title = "An error occurred while loading users."
    const message = "An unexpected error occurred: users were not available when loading completed."
    return <ErrorView title={title} message={message}/>
  }
  return <UsersViewReady users={data.users}/>
}

export default UsersView