import { Container } from "@material-ui/core"
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import { UsersView } from "../../components/users";

const UsersPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bookings Frontend :: Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="users-page" component="main" maxWidth="lg">
        <UsersView/>
      </Container>
    </Fragment>
  );
};

export default UsersPage;