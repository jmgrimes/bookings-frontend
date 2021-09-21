import {
  Container
} from "@material-ui/core"
import {
  NextPage
} from "next"
import Head from "next/head"
import {
  Fragment
} from "react"

import {
  BookableNew
} from "../../components/bookables"

const BookableNewPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: New Bookable</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Container className="new-bookable-page" component="main" maxWidth="lg">
        <BookableNew/>
      </Container>
    </Fragment>
  )
}

export default BookableNewPage