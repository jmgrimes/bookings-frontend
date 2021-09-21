import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from "@material-ui/core"
import {
  Add,
  Edit
} from "@material-ui/icons"
import {
  DateTime
} from "luxon";
import {
  Fragment,
  FunctionComponent,
  ReactNode
} from "react"

import {
  Bookable
} from "../../features/bookables"
import {
  BookingModel
} from "../../features/bookings"
import {
  useUser
} from "../../features/users"

import useStyles from "./useStyles"

type BookingDetailsLayoutProps = {
  action?: ReactNode
  main: ReactNode
}

const BookingDetailsLayout: FunctionComponent<BookingDetailsLayoutProps> = (props) => {
  const {action, main} = props
  return (
    <Card>
      <CardHeader title="Booking Details" action={action}/>
      <CardContent>{main}</CardContent>
    </Card>
  )
}

type BookingDetailsUnselectedProps = {
  bookable: Bookable
}

const BookingDetailsUnselected: FunctionComponent<BookingDetailsUnselectedProps> = (props) => {
  const {bookable} = props
  const classes = useStyles()
  const main = (
    <Fragment>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Bookable</Typography>
        <Typography variant="body1" component="p">{bookable.title}</Typography>
      </div>
      <div className={classes.field}>
        <Typography variant="body1" component="p">
          <i>Select booking slot add a new booking, or view and edit the existing booking.</i>
        </Typography>
      </div>
    </Fragment>
  )
  return <BookingDetailsLayout main={main}/>
}

type BookingDetailsSelectedProps = {
  bookable: Bookable
  bookingModel: BookingModel
  onEdit: () => void
}

const BookingDetailsSelected: FunctionComponent<BookingDetailsSelectedProps> = (props) => {
  const {bookable, bookingModel, onEdit} = props
  const {date, session, title, notes} = bookingModel
  const classes = useStyles()
  const [user] = useUser()

  let action: ReactNode
  if (bookingModel.id) {
    if (bookingModel.bookerId === user?.id) {
      action = (
        <IconButton onClick={onEdit}>
          <Edit/>
        </IconButton>
      )
    }
  }
  else {
    action = (
      <IconButton onClick={onEdit}>
        <Add/>
      </IconButton>
    )
  }
  const main = (
    <Fragment>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Bookable</Typography>
        <Typography variant="body1" component="p">{bookable.title}</Typography>
      </div>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Booking Date</Typography>
        <Typography variant="body1" component="p">{date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</Typography>
      </div>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Session</Typography>
        <Typography variant="body1" component="p">{session}</Typography>
      </div>
      {
        title &&
        <div className={classes.field}>
            <Typography variant="body1" component="label">Title</Typography>
            <Typography variant="body1" component="p">{title}</Typography>
        </div>
      }
      {
        notes &&
        <div className={classes.field}>
            <Typography variant="body1" component="label">Notes</Typography>
            <Typography variant="body1" component="p">{notes}</Typography>
        </div>
      }
    </Fragment>
  )
  return <BookingDetailsLayout action={action} main={main}/>
}

type BookingDetailsProps = {
  bookable: Bookable
  bookingModel?: BookingModel
  onEdit: () => void
}

const BookingModelDetails: FunctionComponent<BookingDetailsProps> = (props) => {
  const {bookable, bookingModel, onEdit} = props;
  if (!bookingModel) {
    return <BookingDetailsUnselected bookable={bookable}/>
  }
  return <BookingDetailsSelected bookable={bookable} bookingModel={bookingModel} onEdit={onEdit}/>
}

export default BookingModelDetails