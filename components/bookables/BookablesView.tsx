import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import { BookableDetails } from "./BookableDetails";
import { BookablesList } from "./BookablesList";
import {CardLoading, ListLoading, ViewError} from "../application";
import { Bookable, useBookables } from "../../features/bookables";

const useStyles = makeStyles(() => ({
  spacer: {
    marginBottom: 10
  }
}));

type BookablesViewReadyProps = {
  bookables: Bookable[];
};

const BookablesViewLoading: FunctionComponent = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <ListLoading/>
      </Grid>
      <Grid item xs={9}>
        <CardLoading/>
      </Grid>
    </Grid>
  );
};

const BookablesViewReady: FunctionComponent<BookablesViewReadyProps> = (props: BookablesViewReadyProps) => {
  const { bookables } = props;
  const classes = useStyles();
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const bookable = id ? bookables.find(b => b.id === id) || bookables[0] : bookables[0];
  const getUrl = (id: number) => `/bookables/${id}`;

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <BookablesList bookable={bookable} bookables={bookables} getUrl={getUrl}/>
        <Typography variant="body1" component="div" className={classes.spacer}/>
        <Link href="/bookables/new" passHref={true}>
          <Button fullWidth={true}
                  variant="outlined"
                  color="primary"
                  startIcon={<Add/>}
                  component="a">
            New Bookable
          </Button>
        </Link>
      </Grid>
      <Grid item xs={9}>
        <BookableDetails bookable={bookable}/>
      </Grid>
    </Grid>
  );
};

export const BookablesView = () => {
  const { data, loading, error } = useBookables();
  if (loading) {
    return <BookablesViewLoading/>
  }
  if (error) {
    return (
      <ViewError title="An error occurred while loading bookables." message={error.message}/>
    );
  }
  if (!data) {
    return (
      <ViewError title="An error occurred while loading bookables."
                 message="An unexpected error occurred: bookables were not available when loading completed."
      />
    );
  }
  return <BookablesViewReady bookables={data.bookables}/>
}