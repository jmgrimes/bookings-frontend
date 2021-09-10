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
import {Control, FieldPath, FieldPathValue, UnpackNestedValue, useController, useForm} from "react-hook-form"

import {Bookable, BookableDay, BookableDays, BookableSession, BookableSessions} from "../../features/bookables"
import {Extra} from "@typescript-eslint/typescript-estree/dist/parser-options";

type OnSave = (bookable: Bookable) => void

type OnDelete = (bookable: Bookable) => void

type OnCancel = (bookable: Bookable) => void

type Values = {
  id: number
  group: string
  title: string
  notes: string
  days: BookableDay[]
  sessions: BookableSession[]
}

type TextFieldPath = Extract<FieldPath<Values>, "title" | "group" | "notes">
type MultiSelectPath = Extract<FieldPath<Values>, "days" | "sessions">

type TextFieldProps<TName extends TextFieldPath> = {
  control: Control<Values>
  name: TName
  label: string
  required?: boolean
}

type MultiSelectProps<TName extends MultiSelectPath> = {
  control: Control<Values>
  name: TName
  label: string
  values: UnpackNestedValue<FieldPathValue<Values, TName>>
}

type BookableFormProps = {
  bookable: Bookable
  onSave: OnSave
  onCancel: OnCancel
  onDelete?: OnDelete
}

const toBookable = (values: Values) => {
  const booking: Bookable = {
    ...values,
    notes: values.notes.length > 0 ? values.notes : undefined
  }
  return booking;
}

const toValues = (bookable: Bookable) => {
  const values: Values = {
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

const BookableFormTextField = <TName extends TextFieldPath>(props: TextFieldProps<TName>) => {
  const classes = useStyles();
  const {control, name, label, required = false} = props;
  const {field, fieldState} = useController({control, name, rules: { required }})
  return (
    <TextField label={label}
               fullWidth={true}
               className={classes.textField}
               error={fieldState.invalid}
               helperText={fieldState.error ? `${label} is required.` : null}
               {...field}/>
  )
}

const BookableFormMultiSelect = <TName extends MultiSelectPath>(props: MultiSelectProps<TName>) => {
  const classes = useStyles();
  const renderValue = (selected: unknown) => (selected as string[]).join(', ')
  const {control, name, label, values} = props;
  const {field, fieldState} = useController({control, name, rules: { validate: values => values.length > 0 }})
  return (
    <div>
      <FormControl className={classes.selectField} error={fieldState.invalid}>
        <InputLabel id={`${name}-label`} error={fieldState.invalid}>{label}</InputLabel>
        <Select labelId={`${name}-label`}
                multiple={true}
                renderValue={renderValue}
                error={fieldState.invalid}
                {...field}>
          {
            values.map(value => (
              <MenuItem key={value} value={value}>
                <ListItemText primary={value}/>
              </MenuItem>
            ))
          }
        </Select>
        <FormHelperText error={fieldState.invalid}>
          {fieldState.error ? `${label} must have at least one selected option.`: null}
        </FormHelperText>
      </FormControl>
    </div>
  )
}

export const BookableForm: FunctionComponent<BookableFormProps> = (props: BookableFormProps) => {
  const {bookable, onCancel, onDelete, onSave} = props;
  const classes = useStyles()

  const defaultValues: Values = useMemo(
    () => toValues(bookable),
    [bookable]
  )

  const {control, handleSubmit, register, reset} = useForm<Values>({defaultValues})

  const _cancel = () => {
    onCancel(bookable)
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
            <BookableFormTextField control={control} name="title" label="Title" required={true}/>
            <BookableFormTextField control={control} name="group" label="Group" required={true}/>
            <BookableFormTextField control={control} name="notes" label="Notes" required={false}/>
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend" className={classes.sectionLabel}>Scheduling</FormLabel>
            <BookableFormMultiSelect control={control} name="days" label="Days" values={BookableDays}/>
            <BookableFormMultiSelect control={control} name="sessions" label="Sessions" values={BookableSessions}/>
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