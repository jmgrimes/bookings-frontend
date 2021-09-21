import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  horizontalSpacer: {
    flexGrow: 1
  },
  field: {
    marginBottom: 10,
    "& label": {
      fontWeight: "bold"
    }
  },
  textField: {
    marginBottom: 10
  },
  header: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    height: 55,
    fontWeight: "bold"
  },
  booking: {
    color: theme.palette.grey.A700,
    "&:hover": {
      background: theme.palette.grey.A100
    }
  },
  bookingSelected: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.light
  },
  buttonGroup: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

export default useStyles