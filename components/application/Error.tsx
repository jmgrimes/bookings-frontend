import { Grid, Typography, makeStyles } from "@material-ui/core";
import { FunctionComponent } from "react";

const useStyles = makeStyles(() => ({
  jumbotron: {
    marginTop: 75
  }
}));

type SimpleErrorProps = {
  message: string;
};

type ViewErrorProps = {
  title: string;
  message: string;
};

export const SimpleError: FunctionComponent<SimpleErrorProps> = ({ message }: SimpleErrorProps) => {
  return (
    <Typography variant="body1" component="div">{message}</Typography>
  );
};

export const ViewError: FunctionComponent<ViewErrorProps> = ({ title, message }: ViewErrorProps) => {
  const classes = useStyles();
  return (
    <Grid container
          alignItems="center"
          justifyContent="center"
          className={classes.jumbotron}
          spacing={3}>
      <Typography variant="h6" component="h6">{title}</Typography>
      <Typography variant="body1" component="p">{message}</Typography>
    </Grid>
  );
};