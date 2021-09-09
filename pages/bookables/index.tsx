import { Container, Typography } from "@material-ui/core"
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

const BookablesPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Bookables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h1">Bookables Page</Typography>
      </Container>
    </Fragment>
  );
};

export default BookablesPage;