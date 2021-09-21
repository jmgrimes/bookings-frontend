import {
  Card,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core"
import {
  Skeleton
} from "@material-ui/lab"
import {
  FunctionComponent
} from "react"

const LoadingCard: FunctionComponent = () => {
  return (
    <Card>
      <CardHeader title={<Skeleton animation="wave"/>} subheader={<Skeleton animation="wave"/>}/>
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave"/>
        </Typography>
        <Typography variant="body1" color="textPrimary">
          <Skeleton animation="wave" width={60}/>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default LoadingCard