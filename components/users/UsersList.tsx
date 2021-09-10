import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import {Person} from "@material-ui/icons"
import Link from "next/link"
import {FunctionComponent} from "react"

import {User} from "../../features/users"

type UsersListGetUrl = (id: number) => (string)
type UsersListProps = {
  user: User
  users: User[]
  getUrl: UsersListGetUrl
}

export const UsersList: FunctionComponent<UsersListProps> = (props: UsersListProps) => {
  const {user, users, getUrl} = props
  return (
    <List>
      {
        users.map(u => (
          <Link key={u.id} href={getUrl(u.id)} passHref={true}>
            <ListItem button={true} selected={u.id === user.id} onClick={() => {}} component="a">
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary={u.name}/>
            </ListItem>
          </Link>
        ))
      }
    </List>
  )
}