import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select
} from "@material-ui/core"
import {
  ArrowLeft,
  ArrowRight,
  DevicesOther
} from "@material-ui/icons"
import Link from "next/link"
import {
  useRouter
} from "next/router"
import {
  ChangeEvent,
  Fragment,
  FunctionComponent
} from "react"

import {
  Bookable
} from "../../features/bookables"

type BookablesListProps = {
  bookable: Bookable
  bookables: Bookable[]
  getUrl: (id: number) => string
}

const BookablesList: FunctionComponent<BookablesListProps> = (props: BookablesListProps) => {
  const {bookable, bookables, getUrl} = props
  const router = useRouter()

  const group = bookable.group || ""
  const groups = [...new Set(bookables.map(b => b.group))]
  const bookablesInGroup = bookables.filter(b => b.group === group)

  const changeGroup = (event: ChangeEvent<{name?: string, value: unknown}>) => {
    const bookablesInSelectedGroup = bookables.filter(b => b.group === event.target.value)
    return router.push(getUrl(bookablesInSelectedGroup[0].id))
  }

  const nextBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable)
    const nextIndex = (currentIndex + 1) % bookablesInGroup.length
    const nextBookable = bookablesInGroup[nextIndex]
    return router.push(getUrl(nextBookable.id))
  }

  const previousBookable = () => {
    const currentIndex = bookablesInGroup.indexOf(bookable)
    const previousIndex = (bookablesInGroup.length + currentIndex - 1) % bookablesInGroup.length
    const previousBookable = bookablesInGroup[previousIndex]
    return router.push(getUrl(previousBookable.id))
  }

  return (
    <Fragment>
      <Select fullWidth value={group} onChange={changeGroup}>
        {groups.map(group => <MenuItem value={group} key={group}>{group}</MenuItem>)}
      </Select>
      <List>
        {
          bookablesInGroup.map(b => (
            <Link key={b.id} href={getUrl(b.id)} passHref={true}>
              <ListItem button={true} selected={b.id === bookable.id} onClick={() => {}} component="a">
                <ListItemIcon>
                  <DevicesOther/>
                </ListItemIcon>
                <ListItemText primary={b.title}/>
              </ListItem>
            </Link>
          ))
        }
      </List>
      <ButtonGroup fullWidth variant="outlined">
        <Button color="primary" startIcon={<ArrowLeft/>} onClick={previousBookable}>Prev</Button>
        <Button color="primary" endIcon={<ArrowRight/>} onClick={nextBookable}>Next</Button>
      </ButtonGroup>
    </Fragment>
  )
}

export default BookablesList