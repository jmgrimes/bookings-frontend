import {
  makeStyles
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  horizontalSpacer: {
    flexGrow: 1,
  },
  verticalSpacer: {
    marginBottom: 10,
  },
  sectionLabel: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
  },
  selectField: {
    width: "95%",
    margin: theme.spacing(1),
  },
}))

export default useStyles