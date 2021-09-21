import {
  Button
} from "@material-ui/core";
import {
  Add
} from "@material-ui/icons";
import Link from "next/link";
import {
  useRouter
} from "next/router";
import {
  Fragment,
  FunctionComponent
} from "react"

import {
  ErrorView,
  Layout,
  LoadingCard,
  LoadingList
} from "../application"
import {
  Bookable,
  useBookables
} from "../../features/bookables"

import BookableDetails from "./BookableDetails";
import BookablesList from "./BookablesList";
import useStyles from "./useStyles";

const BookablesViewLoading: FunctionComponent = () => {
  const sidebar = <LoadingList/>
  const main = <LoadingCard/>
  return <Layout sidebar={sidebar} main={main}/>
}

type BookablesViewReadyProps = {
  bookables: Bookable[]
}

const BookablesViewReady: FunctionComponent<BookablesViewReadyProps> = (props) => {
  const {bookables} = props
  const classes = useStyles()
  const router = useRouter()
  const id = parseInt(router.query.id as string)
  const bookable = id ? bookables.find(b => b.id === id) || bookables[0] : bookables[0]
  const sidebar = (
    <Fragment>
      <BookablesList bookable={bookable} bookables={bookables} getUrl={id => `/bookables/${id}`}/>
      <div className={classes.horizontalSpacer}/>
      <Link href="/bookables/new" passHref={true}>
        <Button fullWidth={true} variant="outlined" color="primary" startIcon={<Add/>} component="a">
          New Bookable
        </Button>
      </Link>
    </Fragment>
  )
  const main = <BookableDetails bookable={bookable}/>
  return <Layout sidebar={sidebar} main={main}/>
}

const BookablesView: FunctionComponent = () => {
  const {data, loading, error} = useBookables();
  if (loading) {
    return <BookablesViewLoading/>
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
  return <BookablesViewReady bookables={data.bookables}/>
}

export default BookablesView