import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField as MTextField,
  makeStyles
} from "@material-ui/core"
import {Cancel, Delete, Save} from "@material-ui/icons"
import {FunctionComponent, useEffect, useMemo} from "react"
import {Control, FieldPath, FieldPathValue, UnpackNestedValue, useController, useForm} from "react-hook-form"

import {Bookable, BookableDay, BookableDayEnum, BookableSession, BookableSessionEnum} from "../../features/bookables"

type OnSave = (bookable: Bookable) => void
type OnDelete = (bookable: Bookable) => void
type OnCancel = () => void
type BookableFormProps = {
  bookable: Bookable
  onSave: OnSave
  onCancel: OnCancel
  onDelete?: OnDelete
}

type BookableFormValues = {
  id: number
  group: string
  title: string
  notes: string
  days: BookableDayEnum[]
  sessions: BookableSessionEnum[]
}

type MultiSelectFieldPath = Extract<FieldPath<BookableFormValues>, "days" | "sessions">
type MultiSelectFieldProps<TName extends MultiSelectFieldPath> = {
  control: Control<BookableFormValues>
  name: TName
  label: string
  values: UnpackNestedValue<FieldPathValue<BookableFormValues, TName>>
}

type TextFieldPath = Extract<FieldPath<BookableFormValues>, "title" | "group" | "notes">
type TextFieldProps<TName extends TextFieldPath> = {
  control: Control<BookableFormValues>
  name: TName
  label: string
  multiline?: boolean
  required?: boolean
}

const toBookable = (values: BookableFormValues) => {
  const booking: Bookable = {
    ...values,
    notes: values.notes.length > 0 ? values.notes : undefined
  }
  return booking;
}

const toValues = (bookable: Bookable) => {
  const values: BookableFormValues = {
    id: bookable.id,
    group: bookable.group,
    title: bookable.title,
    notes: bookable.notes || "",
    days: bookable.days,
    sessions: bookable.sessions
  }
  return values;
}

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

const MultiSelectField = <TName extends MultiSelectFieldPath>(props: MultiSelectFieldProps<TName>) => {
  const classes = useStyles();
  const renderValue = (selected: unknown) => (selected as string[]).join(', ')
  const {control, name, label, values} = props;
  const {field, fieldState} = useController({control, name, rules: { validate: values => values.length > 0 }})
  const helperText = fieldState.error ? `${label} must have at least one selected option.`: null
  return (
    <div>
      <FormControl className={classes.selectField} error={fieldState.invalid}>
        <InputLabel id={`${name}-label`} error={fieldState.invalid}>{label}</InputLabel>
        <Select multiple={true} renderValue={renderValue}
                labelId={`${name}-label`} error={fieldState.invalid} {...field}>
          {
            values.map(value => (
              <MenuItem key={value} value={value}>
                <ListItemText primary={value}/>
              </MenuItem>
            ))
          }
        </Select>
        <FormHelperText error={fieldState.invalid}>{helperText}</FormHelperText>
      </FormControl>
    </div>
  )
}

const TextField = <TName extends TextFieldPath>(props: TextFieldProps<TName>) => {
  const classes = useStyles();
  const {control, name, label, multiline = false, required = false} = props;
  const {field, fieldState} = useController({control, name, rules: { required }})
  const helperText = fieldState.error ? `${label} is required.` : null
  return (
    <MTextField fullWidth={true} multiline={multiline} className={classes.textField}
                label={label} error={fieldState.invalid} helperText={helperText} {...field}/>
  )
}

export const BookableForm: FunctionComponent<BookableFormProps> = (props: BookableFormProps) => {
  const {bookable, onCancel, onDelete, onSave} = props;
  const classes = useStyles()

  const defaultValues: BookableFormValues = useMemo(
    () => toValues(bookable),
    [bookable]
  )

  const {control, handleSubmit, register, reset} = useForm<BookableFormValues>({defaultValues})

  const _cancel = () => {
    onCancel()
  }

  const _delete = () => {
    onDelete && onDelete(bookable)
  }

  const _save = handleSubmit((values) => {
    onSave(toBookable(values))
  })

  useEffect(
    () => reset(toValues(bookable)),
    [bookable, reset]
  )

  return (
    <Card>
      <CardHeader title={onDelete ? "Edit Bookable" : "New Bookable"}/>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.sectionLabel}>Details</FormLabel>
            <input type="hidden" {...register("id",{valueAsNumber: true})}/>
            <TextField control={control} name="title" label="Title" multiline={false} required={true}/>
            <TextField control={control} name="group" label="Group" multiline={false} required={true}/>
            <TextField control={control} name="notes" label="Notes" multiline={true} required={false}/>
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.sectionLabel}>Scheduling</FormLabel>
            <MultiSelectField control={control} name="days" label="Days" values={BookableDay.values}/>
            <MultiSelectField control={control} name="sessions" label="Sessions" values={BookableSession.values}/>
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