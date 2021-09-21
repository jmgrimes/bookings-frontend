import {
  Grid,
  Typography
} from "@material-ui/core"
import {
  FunctionComponent
} from "react"

import Error from "./Error"
import useStyles from "./useStyles"

type ErrorViewProps = {
  title: string
  message: string
}

const ErrorView: FunctionComponent<ErrorViewProps> = (props) => {
  const {title, message} = props
  const classes = useStyles()
  return (
    <Grid container
          alignItems="center"
          justifyContent="center"
          className={classes.jumbotron}
          spacing={3}>
      <Typography variant="h6" component="h6">{title}</Typography>
      <Error message={message}/>
    </Grid>
  )
}

export default ErrorView