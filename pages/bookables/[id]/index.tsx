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
  BookablesView
} from "../../../components/bookables"

const BookablesViewPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Bookables</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Container className="bookables-page" component="main" maxWidth="lg">
        <BookablesView/>
      </Container>
    </Fragment>
  )
}

export default BookablesViewPage