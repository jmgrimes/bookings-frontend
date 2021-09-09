import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

import { User } from "../../features/users";

type UserDetailsProps = {
  user?: User;
};

export const UserDetails: FunctionComponent<UserDetailsProps> = ({ user }: UserDetailsProps) => {
  if (!user) {
    return null;
  }
  return (
    <Card>
      <CardHeader title={user.name} subheader={user.title}/>
      <CardContent>
        <Typography variant="body1" color="textPrimary">{user.notes}</Typography>
      </CardContent>
    </Card>
  );
};