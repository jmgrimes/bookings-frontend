import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core"
import {
  DevicesOther,
  Event,
  Home,
  People,
} from "@material-ui/icons"
import Link from "next/link"
import {
  useRouter,
} from "next/router"
import {
  FunctionComponent,
} from "react"

import {
  UserPicker
} from "../users"

import useStyles from "./useStyles"

const Navigation: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const selectedTab =
    router.pathname.startsWith("/bookings") ? 1 :
    router.pathname.startsWith("/bookables") ? 2 :
    router.pathname.startsWith("/users") ? 3 :
    0

  return (
    <AppBar position="static" color="transparent" className={classes.appbar}>
      <Toolbar>
        <Tabs className={classes.menuTabs} value={selectedTab}>
          <Link href="/" passHref={true}>
            <Tab icon={<Home/>} component="a" label="Home"/>
          </Link>
          <Link href="/bookings" passHref={true}>
            <Tab icon={<Event/>} component="a" label="Bookings"/>
          </Link>
          <Link href="/bookables" passHref={true}>
            <Tab icon={<DevicesOther/>} component="a" label="Bookables"/>
          </Link>
          <Link href="/users" passHref={true}>
            <Tab icon={<People/>} component="a" label="Users"/>
          </Link>
        </Tabs>
        <UserPicker/>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation