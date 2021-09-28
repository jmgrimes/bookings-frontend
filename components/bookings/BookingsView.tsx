import {
  Grid
} from "@material-ui/core";
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState
} from "react"

import {
  ErrorView,
  LoadingCard,
  LoadingList,
  LoadingTable
} from "../application"
import {
  BookablesList
} from "../bookables"
import {
  Bookable,
  useBookables
} from "../../features/bookables"
import {
  BookingModel,
  useBookings,
  useBookingsParams
} from "../../features/bookings"

import BookingModelController from "./BookingModelController"
import BookingModelTable from "./BookingModelTable"
import WeekPicker from "./WeekPicker"

type BookingsViewLayoutProps = {
  sidebar: ReactNode
  table: ReactNode
  card: ReactNode
}

const BookingsViewLayout: FunctionComponent<BookingsViewLayoutProps> = (props) => {
  const {sidebar, table, card} = props
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>{sidebar}</Grid>
      <Grid item xs={7}>
        <WeekPicker/>
        {table}
      </Grid>
      <Grid item xs={3}>{card}</Grid>
    </Grid>
  )
}

const BookingsViewLoading = () => {
  const sidebar = <LoadingList/>
  const table = <LoadingTable/>
  const card = <LoadingCard/>
  return <BookingsViewLayout sidebar={sidebar} table={table} card={card}/>
}

type BookingsViewReadyProps = {
  bookables: Bookable[]
}

const BookingsViewReady: FunctionComponent<BookingsViewReadyProps> = (props) => {
  const {bookables} = props
  const {date, week, bookableId} = useBookingsParams()
  const bookable = bookables.find(b => b.id === bookableId) || bookables[0];

  const [bookingModel, setBookingModel] = useState<BookingModel>()
  const {data, loading, error} = useBookings(bookable, week.start, week.end)

  const getUrl = (id: number) => {
    const root = `/bookings?bookableId=${id}`
    return date ? `${root}&date=${date.toISODate()}` : root
  }

  useEffect(
    () => {
      setBookingModel(undefined)
    },
    [bookable, setBookingModel]
  )

  let table: ReactNode
  let card: ReactNode

  if (loading) {
    table = <LoadingTable/>
    card = <LoadingCard/>
  }
  else if (error) {
    const title = "An error occurred while loading bookings."
    return <ErrorView title={title} message={error.message}/>
  }
  else if (!data) {
    const title = "An error occurred while loading bookings."
    const message = "An unexpected error occurred: bookings were not available when loading completed."
    return <ErrorView title={title} message={message}/>
  }
  else {
    table = <BookingModelTable
      bookable={bookable}
      bookings={data.bookings}
      bookingModel={bookingModel}
      setBookingModel={setBookingModel}
    />
    card = <BookingModelController
      bookable={bookable}
      bookingModel={bookingModel}
      setBookingModel={setBookingModel}
    />
  }

  const sidebar = <BookablesList bookables={bookables} bookable={bookable} getUrl={getUrl}/>
  return <BookingsViewLayout sidebar={sidebar} table={table} card={card}/>
}

const BookingsView: FunctionComponent = () => {
  const {data, loading, error} = useBookables();
  if (loading) {
    return <BookingsViewLoading/>
  }
  if (error) {
    const title = "An error occurred while loading bookables."
    return <ErrorView title={title} message={error.message}/>
  }
  if (!data) {
    const title = "An error occurred while loading bookables."
    const message = "An unexpected error occurred: bookables were not available when loading completed."
    return <ErrorView title={title} message={message}/>
  }
  return <BookingsViewReady bookables={data.bookables}/>
}

export default BookingsView