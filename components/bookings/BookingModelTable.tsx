import {Table, TableBody, TableCell, TableHead, TableRow, makeStyles} from "@material-ui/core"
import {DateTime} from "luxon"
import {Dispatch, FunctionComponent, SetStateAction} from "react"

import {Booking, BookingModel, useBookingsParams} from "../../features/bookings"
import {Bookable, BookableDay, BookableDayModel, BookableSession, BookableSessionModel} from "../../features/bookables"
import {useUser} from "../../features/users"

type BookingCellProps = {
  day: BookableDayModel
  session: BookableSessionModel
}

type BookingModelTableProps = {
  bookable: Bookable
  bookings: Booking[]
  bookingModel?: BookingModel
  setBookingModel: Dispatch<SetStateAction<BookingModel | undefined>>
}

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    height: 55,
    fontWeight: "bold"
  },
  booking: {
    color: theme.palette.grey.A700,
    "&:hover": {
      background: theme.palette.grey.A100
    }
  },
  bookingSelected: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.light
  }
}));

export const BookingModelTable: FunctionComponent<BookingModelTableProps> = (props: BookingModelTableProps) => {
  const classes = useStyles()
  const [user] = useUser()
  const {week} = useBookingsParams()
  const {bookable, bookingModel, bookings, setBookingModel} = props
  const days: BookableDayModel[] = bookable.days.map(day => BookableDay.toModel(week.start, day))
  const sessions: BookableSessionModel[] = bookable.sessions.map(BookableSession.toModel)

  const BookingModelCell: FunctionComponent<BookingCellProps> = (props: BookingCellProps) => {
    const {day, session} = props
    const booking = bookings.find(b => b.session === session.session && b.date.toISODate() === day.date.toISODate())
    const cellBookingModel = booking ?
      BookingModel.fromBooking(booking) :
      BookingModel.fromSessionOnDay(day, session, user)
    const selected =
      cellBookingModel.date.toISODate() === bookingModel?.date.toISODate() &&
      cellBookingModel.session === bookingModel?.session
    return (
      <TableCell variant="body" align="center" onClick={() => setBookingModel(cellBookingModel)}
                 className={selected ? classes.bookingSelected : classes.booking}>
        {cellBookingModel.title || ""}
      </TableCell>
    );
  };

  return (
      <Table>
        <TableHead>
          <TableRow key="header">
            <TableCell align="center" valign="middle" className={classes.header} key="nexus"/>
            {
              days.map(day =>
                <TableCell align="center" className={classes.header} key={`${day.date.toISODate()}-header`}>
                  {day.date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sessions.map(session =>
              <TableRow key={`${session.session}-row`}>
                <TableCell align="center" className={classes.header} key={`${session.session}-header`}>
                  {session.session}
                </TableCell>
                {
                  days.map(day => <BookingModelCell
                    key={`${day.date.toISODate()}-${session.session}-cell`}
                    day={day} session={session}
                  />)
                }
              </TableRow>
            )
          }
        </TableBody>
      </Table>
  );
};