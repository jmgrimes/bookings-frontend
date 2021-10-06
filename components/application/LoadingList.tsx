import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import {
  Skeleton,
} from "@material-ui/lab"
import {
  FunctionComponent,
} from "react"

type ListLoadingProps = {
  items?: number
}

const LoadingList: FunctionComponent<ListLoadingProps> = (props) => {
  const {items = 4} = props
  return (
    <List>
      {
        [...Array(items)].map((_, index) => (
          <ListItem key={index} button={true}>
            <ListItemText primary={<Skeleton animation="wave"/>}/>
          </ListItem>
        ))
      }
    </List>
  )
}

export default LoadingList