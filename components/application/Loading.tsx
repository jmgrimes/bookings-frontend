import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core"
import {Skeleton} from "@material-ui/lab"
import {FunctionComponent} from "react"

export const CardLoading: FunctionComponent = () => {
  return (
    <Card>
      <CardHeader title={<Skeleton animation="wave"/>} subheader={<Skeleton animation="wave"/>}/>
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave" width={60}/>
        </Typography>
      </CardContent>
    </Card>
  )
}

export const ListLoading: FunctionComponent = () => {
  return (
    <List>
      {
        [0, 1, 2, 3].map(key => (
          <ListItem key={key} button={true}>
            <ListItemText primary={<Skeleton animation="wave"/>}/>
          </ListItem>
        ))
      }
    </List>
  )
}

export const SimpleLoading: FunctionComponent = () => {
  return (
    <CircularProgress/>
  )
}

export const TableLoading: FunctionComponent = () => {
  return (
    <Table>
      <TableHead>
        <TableRow key="header">
          <TableCell align="center" valign="middle">
            <Skeleton variant="text" animation="wave"/>
          </TableCell>
          <TableCell align="center" valign="middle">
            <Skeleton variant="text" animation="wave"/>
          </TableCell>
          <TableCell align="center" valign="middle">
            <Skeleton variant="text" animation="wave"/>
          </TableCell>
          <TableCell align="center" valign="middle">
            <Skeleton variant="text" animation="wave"/>
          </TableCell>
          <TableCell align="center" valign="middle">
            <Skeleton variant="text" animation="wave"/>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          [0, 1, 2, 3].map(key => (
            <TableRow key={key}>
              <TableCell align="center" valign="middle">
                <Skeleton variant="text" animation="wave"/>
              </TableCell>
              <TableCell align="center" valign="middle">
                <Skeleton variant="text" animation="wave"/>
              </TableCell>
              <TableCell align="center" valign="middle">
                <Skeleton variant="text" animation="wave"/>
              </TableCell>
              <TableCell align="center" valign="middle">
                <Skeleton variant="text" animation="wave"/>
              </TableCell>
              <TableCell align="center" valign="middle">
                <Skeleton variant="text" animation="wave"/>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}