import {Container} from "@material-ui/core"
import {NextPage} from "next"
import Head from "next/head"
import {Fragment} from "react"
import {BookingsView} from "../../components/bookings"

const BookingsPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Bookings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="bookings-page" component="main" maxWidth="xl">
        <BookingsView/>
      </Container>
    </Fragment>
  )
}

export default BookingsPage