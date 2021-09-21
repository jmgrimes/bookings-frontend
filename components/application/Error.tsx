import {
  Typography
} from "@material-ui/core"
import {
  FunctionComponent
} from "react"

type ErrorProps = {
  message: string
}

const Error: FunctionComponent<ErrorProps> = (props) => {
  const {message} = props
  return (
    <Typography variant="body1" component="div">{message}</Typography>
  )
}

export default Error