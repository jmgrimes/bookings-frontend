import {Grid} from "@material-ui/core";
import {Fragment, FunctionComponent, ReactNode, useEffect, useState} from "react";

import {BookingModelController} from "./BookingModelController"
import {BookingModelTable} from "./BookingModelTable";
import {WeekPicker} from "./WeekPicker";
import {BookablesList} from "../bookables";
import {Bookable, useBookables} from "../../features/bookables";
import {BookingModel, useBookings, useBookingsParams} from "../../features/bookings";
import {CardLoading, ListLoading, TableLoading, ViewError} from "../application";

type BookingsViewLayoutProps = {
  sidebarContent: ReactNode
  tableContent: ReactNode
  cardContent: ReactNode
}

type BookablesListReadyProps = {
  bookables: Bookable[]
}

const BookingsViewLayout: FunctionComponent<BookingsViewLayoutProps> = (props: BookingsViewLayoutProps) => {
  const {sidebarContent, tableContent, cardContent} = props
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>{sidebarContent}</Grid>
      <Grid item xs={7}>
        <WeekPicker/>
        {tableContent}
      </Grid>
      <Grid item xs={3}>{cardContent}</Grid>
    </Grid>
  )
}

const BookingsViewLoading = () => {
  const sidebarContent = <ListLoading/>
  const tableContent = <TableLoading/>
  const cardContent = <CardLoading/>
  return <BookingsViewLayout sidebarContent={sidebarContent} tableContent={tableContent} cardContent={cardContent}/>
}

const BookingsViewReady: FunctionComponent<BookablesListReadyProps> = (props: BookablesListReadyProps) => {
  const {bookables} = props
  const [bookingModel, setBookingModel] = useState<BookingModel>()
  const {date, week, bookableId} = useBookingsParams()
  const bookable = bookables.find(b => b.id === bookableId) || bookables[0];
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

  let tableContent: ReactNode
  let cardContent: ReactNode

  if (loading) {
    tableContent = <TableLoading/>
    cardContent = <CardLoading/>
  }
  else if (error) {
    const title = "An error occurred while loading bookings."
    return <ViewError title={title} message={error.message}/>
  }
  else if (!data) {
    const title = "An error occurred while loading bookings."
    const message = "An unexpected error occurred: bookings were not available when loading completed."
    return <ViewError title={title} message={message}/>
  }
  else {
    tableContent = <BookingModelTable
      bookable={bookable}
      bookings={data.bookings}
      bookingModel={bookingModel}
      setBookingModel={setBookingModel}
    />
    cardContent = <BookingModelController
      bookable={bookable}
      bookingModel={bookingModel}
      setBookingModel={setBookingModel}
    />
  }

  const sidebarContent = <BookablesList bookables={bookables} bookable={bookable} getUrl={getUrl}/>
  return <BookingsViewLayout sidebarContent={sidebarContent} tableContent={tableContent} cardContent={cardContent}/>
}


export const BookingsView: FunctionComponent = () => {
  const {data, loading, error} = useBookables();
  if (loading) {
    return <BookingsViewLoading/>
  }
  if (error) {
    const title = "An error occurred while loading bookables."
    return <ViewError title={title} message={error.message}/>
  }
  if (!data) {
    const title = "An error occurred while loading bookables."
    const message = "An unexpected error occurred: bookables were not available when loading completed."
    return <ViewError title={title} message={message}/>
  }
  return <BookingsViewReady bookables={data.bookables}/>
};