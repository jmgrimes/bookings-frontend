import {Card, CardContent, CardHeader, IconButton, Typography, makeStyles} from "@material-ui/core"
import {Add, Edit} from "@material-ui/icons"
import {Fragment, FunctionComponent, ReactNode} from "react"

import {Bookable} from "../../features/bookables"
import {BookingModel} from "../../features/bookings"
import {useUser} from "../../features/users"

type BookingDetailsLayoutProps = {
  actionContent?: ReactNode
  mainContent: ReactNode
}

type BookingDetailsUnselectedProps = {
  bookable: Bookable
}

type BookingDetailsSelectedProps = {
  bookable: Bookable
  bookingModel: BookingModel
  onEdit: () => void
}

type BookingDetailsProps = {
  bookable: Bookable
  bookingModel?: BookingModel
  onEdit: () => void
}

const useStyles = makeStyles(() => ({
  field: {
    marginBottom: 10,
    "& label": {
      fontWeight: "bold"
    }
  }
}))

export const BookingDetailsLayout: FunctionComponent<BookingDetailsLayoutProps> = (props: BookingDetailsLayoutProps) => {
  const {actionContent, mainContent} = props
  return (
    <Card>
      <CardHeader title="Booking Details" action={actionContent}/>
      <CardContent>{mainContent}</CardContent>
    </Card>
  )
}

const BookingDetailsUnselected: FunctionComponent<BookingDetailsUnselectedProps> = (
  props: BookingDetailsUnselectedProps
) => {
  const {bookable} = props
  const classes = useStyles()
  const mainContent = (
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
  return <BookingDetailsLayout mainContent={mainContent}/>
}

const BookingDetailsSelected: FunctionComponent<BookingDetailsSelectedProps> = (
  props: BookingDetailsSelectedProps
) => {
  const {bookable, bookingModel, onEdit} = props
  const {date, session, title, notes} = bookingModel
  const classes = useStyles()
  const [user] = useUser()

  let actionContent: ReactNode
  if (bookingModel.id) {
    if (bookingModel.bookerId === user?.id) {
      actionContent = (
        <IconButton onClick={onEdit}>
          <Edit/>
        </IconButton>
      )
    }
  }
  else {
    actionContent = (
      <IconButton onClick={onEdit}>
        <Add/>
      </IconButton>
    )
  }
  const mainContent = (
    <Fragment>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Bookable</Typography>
        <Typography variant="body1" component="p">{bookable.title}</Typography>
      </div>
      <div className={classes.field}>
        <Typography variant="body1" component="label">Booking Date</Typography>
        <Typography variant="body1" component="p">{date}</Typography>
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
  return <BookingDetailsLayout actionContent={actionContent} mainContent={mainContent}/>
}

export const BookingModelDetails: FunctionComponent<BookingDetailsProps> = (props: BookingDetailsProps) => {
  const {bookable, bookingModel, onEdit} = props;
  if (!bookingModel) {
    return <BookingDetailsUnselected bookable={bookable}/>
  }
  return <BookingDetailsSelected bookable={bookable} bookingModel={bookingModel} onEdit={onEdit}/>
}