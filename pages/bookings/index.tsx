import {Container, Typography} from "@material-ui/core"
import {NextPage} from "next"
import Head from "next/head"
import {Fragment} from "react"

const BookingsPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Bookings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h1">Bookings Page</Typography>
      </Container>
    </Fragment>
  )
}

export default BookingsPage