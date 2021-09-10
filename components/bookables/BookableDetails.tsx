import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core"
import {CalendarToday, Edit, Event, Visibility, VisibilityOff} from "@material-ui/icons"
import Link from "next/link"
import {Fragment, FunctionComponent, useState} from "react"

import {Bookable} from "../../features/bookables"

type BookableDetailsProps = {
  bookable: Bookable
}

export const BookableDetails: FunctionComponent<BookableDetailsProps> = (props: BookableDetailsProps) => {
  const {bookable} = props
  const [showDetails, setShowDetails] = useState(true)
  const toggleDetails = () => setShowDetails(showDetails => !showDetails)

  const action = (
    <Fragment>
      <IconButton onClick={toggleDetails}>
        {showDetails ? <VisibilityOff /> : <Visibility />}
      </IconButton>
      <Link href={`/bookables/${bookable.id}/edit`} passHref={true}>
        <IconButton component="a">
          <Edit/>
        </IconButton>
      </Link>
    </Fragment>
  )
  const details = (
    <CardContent>
      <Typography variant="h6" component="h6">Availability</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <List>
            {
              bookable.days.map(day =>
                <ListItem key={day}>
                  <ListItemIcon>
                    <CalendarToday/>
                  </ListItemIcon>
                  <ListItemText primary={day}/>
                </ListItem>
              )
            }
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            {
              bookable.sessions.map(session =>
                <ListItem key={session}>
                  <ListItemIcon>
                    <Event/>
                  </ListItemIcon>
                  <ListItemText primary={session}/>
                </ListItem>
              )
            }
          </List>
        </Grid>
      </Grid>
    </CardContent>
  )
  return (
    <Card>
      <CardHeader title={bookable.title} action={action}/>
      <CardContent>
        <Typography variant="body1" component="p">{bookable.notes}</Typography>
      </CardContent>
      { showDetails && details }
    </Card>
  )
}