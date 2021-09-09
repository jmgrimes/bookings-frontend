import { Container } from "@material-ui/core"
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import { BookableEdit } from "../../../components/bookables";

const BookableEditPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Edit Bookable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="edit-bookable-page" component="main" maxWidth="lg">
        <BookableEdit />
      </Container>
    </Fragment>
  );
};

export default BookableEditPage;