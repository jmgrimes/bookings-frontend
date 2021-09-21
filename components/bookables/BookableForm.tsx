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
  TextField as MuiTextField
} from "@material-ui/core"
import {
  Cancel,
  Delete,
  Save
} from "@material-ui/icons"
import {
  FunctionComponent,
  useEffect,
  useMemo
} from "react"
import {
  Control,
  FieldPath,
  FieldPathValue,
  UnpackNestedValue,
  useController,
  useForm
} from "react-hook-form"

import {
  Bookable,
  BookableDay,
  BookableDayEnum,
  BookableSession,
  BookableSessionEnum
} from "../../features/bookables"

import useStyles from "./useStyles"

type BookableFormValues = {
  id: number
  group: string
  title: string
  notes: string
  days: BookableDayEnum[]
  sessions: BookableSessionEnum[]
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
  return values
}

type MultiSelectFieldPath = Extract<FieldPath<BookableFormValues>, "days" | "sessions">
type MultiSelectFieldProps = {
  control: Control<BookableFormValues>
  name: MultiSelectFieldPath
  label: string
  values: UnpackNestedValue<FieldPathValue<BookableFormValues, MultiSelectFieldPath>>
}

const MultiSelectField: FunctionComponent<MultiSelectFieldProps> = (props) => {
  const {control, name, label, values} = props
  const classes = useStyles()
  const {field, fieldState} = useController({control, name, rules: { validate: values => values.length > 0 }})
  const helperText = fieldState.error ? `${label} must have at least one selected option.`: null
  return (
    <div>
      <FormControl className={classes.selectField} error={fieldState.invalid}>
        <InputLabel id={`${name}-label`} error={fieldState.invalid}>{label}</InputLabel>
        <Select multiple={true} 
                renderValue={(selected: unknown) => (selected as string[]).join(', ')}
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

type TextFieldPath = Extract<FieldPath<BookableFormValues>, "title" | "group" | "notes">
type TextFieldProps = {
  control: Control<BookableFormValues>
  name: TextFieldPath
  label: string
  multiline?: boolean
  required?: boolean
}

const TextField: FunctionComponent<TextFieldProps> = (props) => {
  const classes = useStyles();
  const {control, name, label, multiline = false, required = false} = props;
  const {field, fieldState} = useController({control, name, rules: { required }})
  const helperText = fieldState.error ? `${label} is required.` : null
  return (
    <MuiTextField fullWidth={true} multiline={multiline} className={classes.textField}
                  label={label} error={fieldState.invalid} helperText={helperText} {...field}/>
  )
}

type BookableFormProps = {
  bookable: Bookable
  onSave: (bookable: Bookable) => void
  onCancel: () => void
  onDelete?: (bookable: Bookable) => void
}

const BookableForm: FunctionComponent<BookableFormProps> = (props) => {
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
        <div className={classes.horizontalSpacer}/>
        <Button variant="contained" color="primary" startIcon={<Save/>} onClick={_save}>Save</Button>
        {
          onDelete &&
          <Button variant="contained" color="secondary" startIcon={<Delete/>} onClick={_delete}>
              Delete
          </Button>
        }
        <Button variant="contained" startIcon={<Cancel/>} onClick={_cancel}>Cancel</Button>
        <div className={classes.horizontalSpacer}/>
      </CardActions>
    </Card>
  )
}

export default BookableForm