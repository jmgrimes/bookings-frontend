import {
  Grid,
} from "@material-ui/core"
import {
  FunctionComponent,
  ReactNode,
} from "react"

type LayoutSidebarMainProps = {
  sidebar: ReactNode
  main: ReactNode
}

const Layout: FunctionComponent<LayoutSidebarMainProps> = (props) => {
  const {sidebar, main} = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>{sidebar}</Grid>
      <Grid item xs={9}>{main}</Grid>
    </Grid>
  )
}

export default Layout