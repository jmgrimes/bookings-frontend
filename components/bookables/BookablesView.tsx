import {Button, Grid, Typography, makeStyles} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import Link from "next/link"
import {useRouter} from "next/router"
import {Fragment, FunctionComponent, ReactNode} from "react"

import {BookableDetails} from "./BookableDetails"
import {BookablesList} from "./BookablesList"
import {CardLoading, ListLoading, ViewError} from "../application"
import {Bookable, useBookables} from "../../features/bookables"

type BookablesViewLayoutProps = {
  sidebarContent: ReactNode,
  mainContent: ReactNode
}

type BookablesViewReadyProps = {
  bookables: Bookable[]
}

const useStyles = makeStyles(() => ({
  spacer: {
    marginBottom: 10
  }
}))

const BookablesViewLayout: FunctionComponent<BookablesViewLayoutProps> = (props: BookablesViewLayoutProps) => {
  const {sidebarContent, mainContent} = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        {sidebarContent}
      </Grid>
      <Grid item xs={9}>
        {mainContent}
      </Grid>
    </Grid>
  )
}

const BookablesViewLoading: FunctionComponent = () => {
  const sidebarContent = <ListLoading/>
  const mainContent = <CardLoading/>
  return <BookablesViewLayout sidebarContent={sidebarContent} mainContent={mainContent}/>
}

const BookablesViewReady: FunctionComponent<BookablesViewReadyProps> = (props: BookablesViewReadyProps) => {
  const {bookables} = props
  const classes = useStyles()
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const bookable = id ? bookables.find(b => b.id === id) || bookables[0] : bookables[0]

  const sidebarContent = (
    <Fragment>
      <BookablesList bookable={bookable} bookables={bookables} getUrl={id => `/bookables/${id}`}/>
      <Typography variant="body1" component="div" className={classes.spacer}/>
      <Link href="/bookables/new" passHref={true}>
        <Button fullWidth={true} variant="outlined" color="primary" startIcon={<Add/>} component="a">
          New Bookable
        </Button>
      </Link>
    </Fragment>
  )
  const mainContent = <BookableDetails bookable={bookable}/>
  return <BookablesViewLayout sidebarContent={sidebarContent} mainContent={mainContent}/>
}

export const BookablesView = () => {
  const {data, loading, error} = useBookables();
  if (loading) {
    return <BookablesViewLoading/>
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
  return <BookablesViewReady bookables={data.bookables}/>
}