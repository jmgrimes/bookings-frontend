import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  makeStyles
} from "@material-ui/core"
import {Cancel, Delete, Save} from "@material-ui/icons"
import {FunctionComponent, useEffect, useMemo} from "react"
import {useController, useForm} from "react-hook-form"

import {Bookable, BookableDay, BookableDays, BookableSession, BookableSessions} from "../../features/bookables"

const useStyles = makeStyles((theme) => ({
  flexSpacer: {
    flexGrow: 1
  },
  sectionLabel: {
    margin: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(1)
  },
  selectField: {
    width: "95%",
    margin: theme.spacing(1)
  }
}))

type BookableFormValues = {
  id?: number
  group: string
  title: string
  notes: string
  days: BookableDay[]
  sessions: BookableSession[]
}

export const BookableForm: FunctionComponent<any> = ({bookable, onCancel, onDelete, onSave}: any) => {
  const classes = useStyles()

  const defaultValues: Bookable = useMemo(
    () => bookable,
    [bookable]
  )

  const {control, handleSubmit, register, reset} = useForm<BookableFormValues>({defaultValues})
  const idField = register("id", {valueAsNumber: true})
  const {field: titleField, fieldState: titleFieldState} = useController({
    control,
    name: "title",
    rules: {
      required: true
    }
  })
  const {field: groupField, fieldState: groupFieldState} = useController({
    control,
    name: "group",
    rules: {
      required: true
    }
  })
  const {field: notesField, fieldState: notesFieldState} = useController({
    control,
    name: "notes",
    rules: {
      required: true
    }
  })
  const {field: daysField, fieldState: daysFieldState} = useController({
    control,
    name: "days",
    rules: {
      required: true
    }
  })
  const {field: sessionsField, fieldState: sessionsFieldState} = useController({
    control,
    name: "sessions",
    rules: {
      required: true
    }
  })
  const titleError = titleFieldState.error?.type === "required" ? "Title is required." : null
  const groupError = groupFieldState.error?.type === "required" ? "Group is required." : null
  const notesError = notesFieldState.error?.type === "required" ? "Notes is required" : null
  const daysError = daysFieldState.error?.type === "required" ? "Days is required": null
  const sessionsError = sessionsFieldState.error?.type === "required" ? "Days is required": null

  const renderValue = (selected: unknown) => (selected as string[]).join(', ')

  const _cancel = () => {
    onCancel(bookable)
  }

  const _delete = () => {
    onDelete(bookable)
  }

  const _save = handleSubmit((values) => {
    onSave(values)
  })

  useEffect(
    () => reset(bookable),
    [bookable, reset]
  )

  return (
    <Card>
      <CardHeader title={onDelete ? "Edit Bookable" : "New Bookable"}/>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.sectionLabel}>Details</FormLabel>
            <input type="hidden" {...idField}/>
            <TextField label="Title" className={classes.textField} fullWidth={true}
                       error={titleFieldState.invalid} helperText={titleError} {...titleField}/>
            <TextField label="Group" className={classes.textField} fullWidth={true}
                       error={groupFieldState.invalid} helperText={groupError} {...groupField}/>
            <TextField label="Notes" className={classes.textField} fullWidth={true} multiline={true}
                       error={notesFieldState.invalid} helperText={notesError} {...notesField}/>
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.sectionLabel}>Scheduling</FormLabel>
            <div>
              <FormControl className={classes.selectField} error={daysFieldState.invalid}>
                <InputLabel id="days-label" error={daysFieldState.invalid}>Days</InputLabel>
                <Select labelId="days-label" multiple={true}
                        renderValue={renderValue} error={daysFieldState.invalid} {...daysField}>
                  {
                    BookableDays.map(day => (
                      <MenuItem key={day.toString()} value={day.toString()}>
                        <Checkbox checked={daysField.value.indexOf(day) > -1} />
                        <ListItemText primary={day.toString()} />
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText error={daysFieldState.invalid}>{daysError}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.selectField} error={sessionsFieldState.invalid}>
                <InputLabel id="sessions-label" error={sessionsFieldState.invalid}>Sessions</InputLabel>
                <Select labelId="sessions-label" multiple={true}
                        renderValue={renderValue} error={sessionsFieldState.invalid} {...sessionsField}>
                  {
                    BookableSessions.map(session => (
                      <MenuItem key={session.toString()} value={session.toString()}>
                        <Checkbox checked={sessionsField.value.indexOf(session) > -1} />
                        <ListItemText primary={session.toString()} />
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText error={sessionsFieldState.invalid}>{sessionsError}</FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <div className={classes.flexSpacer}/>
        <Button variant="contained" color="primary" startIcon={<Save/>} onClick={_save}>Save</Button>
        {
          onDelete &&
          <Button variant="contained" color="secondary" startIcon={<Delete/>} onClick={_delete}>
              Delete
          </Button>
        }
        <Button variant="contained" startIcon={<Cancel/>} onClick={_cancel}>Cancel</Button>
        <div className={classes.flexSpacer}/>
      </CardActions>
    </Card>
  )
}