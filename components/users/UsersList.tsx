import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import { User } from "../../features/users";

type GetUrl = (id: number) => (string);

type UsersListProps = {
  user?: User;
  users: User[];
  getUrl: GetUrl;
};

export const UsersList: FunctionComponent<UsersListProps> = ({ user, users, getUrl }: UsersListProps) => {
  const router = useRouter();
  return (
    <List>
      {
        users.map(u => (
          <ListItem key={u.id}
                    button={true}
                    selected={u.id === user?.id}
                    onClick={() => router.push(getUrl(u.id))}>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText primary={u.name}/>
          </ListItem>
        ))
      }
    </List>
  );
};