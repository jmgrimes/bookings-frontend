import {Button, ButtonGroup, TextField, Toolbar, makeStyles} from "@material-ui/core";
import {ArrowLeft, ArrowRight, CalendarToday, EventAvailable} from "@material-ui/icons";
import {DateTime} from "luxon";
import {FunctionComponent, useState} from "react";

import {useBookingsParams} from "../../features/bookings";

const useStyles = makeStyles((theme) => ({
  flexSpacer: {
    flexGrow: 1
  },
  buttonGroup: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export const WeekPicker: FunctionComponent = () => {
  const classes = useStyles()
  const {date, setBookingsDate} = useBookingsParams()
  const [dateText, setDateText] = useState(DateTime.now().toISODate())
  const dates = {
    previous: date.minus({ days: 7 }),
    next: date.plus({ days: 7} ),
    today: DateTime.now()
  }

  const go = () => setBookingsDate(DateTime.fromISO(dateText))
  const next = () => setBookingsDate(dates.next)
  const previous = () => setBookingsDate(dates.previous)

  const today = () => {
    setDateText(dates.today.toISODate())
    setBookingsDate(dates.today)
  }

  return (
    <Toolbar variant="dense" disableGutters={true}>
      <Button startIcon={<ArrowLeft/>} onClick={previous}>Previous</Button>
      <div className={classes.flexSpacer}/>
      <TextField type="date" value={dateText} onChange={event => setDateText(event.target.value)}/>
      <ButtonGroup variant="text" className={classes.buttonGroup}>
        <Button startIcon={<EventAvailable/>} onClick={go}>Go</Button>
        <Button startIcon={<CalendarToday/>} onClick={today}>Today</Button>
      </ButtonGroup>
      <div className={classes.flexSpacer}/>
      <Button endIcon={<ArrowRight/>} onClick={next}>Next</Button>
    </Toolbar>
  )
}