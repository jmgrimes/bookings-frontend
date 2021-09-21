import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography
} from "@material-ui/core"
import {
  Cancel,
  Delete,
  Save
} from "@material-ui/icons"
import {
  DateTime
} from "luxon"
import {
  FunctionComponent,
  useEffect,
  useMemo
} from "react"
import {
  useController,
  useForm
} from "react-hook-form"

import {
  BookingModel
} from "../../features/bookings"
import {
  Bookable,
  BookableSessionEnum
} from "../../features/bookables"

import useStyles from "./useStyles"

type BookingFormValues = {
  id: number
  bookerId: number
  date: string
  session: BookableSessionEnum
  title: string
  notes?: string
}

const toBookingModel = (values: BookingFormValues) => {
  return new BookingModel(
    values.id,
    values.bookerId,
    DateTime.fromISO(values.date),
    values.session,
    values.title,
    values.notes
  )
}

const fromBookingModel = (bookingModel: BookingModel) => {
  const values: BookingFormValues = {
    id: bookingModel.id || 0,
    bookerId: bookingModel.bookerId,
    date: bookingModel.date.toISODate(),
    session: bookingModel.session,
    title: bookingModel.title,
    notes: bookingModel.notes
  }
  return values
}

type BookingModelFormProps = {
  bookable: Bookable
  bookingModel: BookingModel
  onSave: (bookingModel: BookingModel) => void
  onCancel: () => void
  onDelete?: (bookingModel: BookingModel) => void
}

export const BookingModelForm: FunctionComponent<BookingModelFormProps> = (props) => {
  const {bookable, bookingModel, onCancel, onDelete, onSave} = props;

  const classes = useStyles();
  const defaultValues = useMemo(
    () => fromBookingModel(bookingModel),
    [bookingModel]
  );

  const {control, handleSubmit, register, reset} = useForm({defaultValues});
  const {field: titleField, fieldState: titleFieldState} = useController({
    control,
    name: "title",
    rules: {
      required: true
    }
  });
  const {field: notesField, fieldState: notesFieldState} = useController({
    control,
    name: "notes",
    rules: {
      required: false
    }
  });

  useEffect(
    () => reset(fromBookingModel(bookingModel)),
    [bookingModel, reset]
  );

  const _cancel = () => {
    onCancel();
  }

  const _delete = () => {
    onDelete && onDelete(bookingModel);
  };

  const _save = handleSubmit(values => {
    const bookingModel = toBookingModel(values);
    onSave(bookingModel);
  });

  const titleError = titleFieldState.error?.type === "required" ? "Title is required." : null;
  const notesError = notesFieldState.invalid ? "Notes is invalid." : null;

  return (
    <Card>
      <CardHeader title={onDelete ? "Edit Booking Details" : "New Booking Details"}/>
      <CardContent>
        <input type="hidden" {...register("id", {valueAsNumber: true})}/>
        <input type="hidden" {...register("bookerId", {valueAsNumber: true})}/>
        <input type="hidden" {...register("date")}/>
        <input type="hidden" {...register("session")}/>
        <div className={classes.field}>
          <Typography variant="body1" component="label">Bookable</Typography>
          <Typography variant="body1" component="p">{bookable.title}</Typography>
        </div>
        <TextField fullWidth
                   label="Date"
                   contentEditable={false}
                   className={classes.textField}
                   value={bookingModel.date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}/>
        <TextField fullWidth
                   label="Session"
                   contentEditable={false}
                   className={classes.textField}
                   value={bookingModel.session}/>
        <TextField fullWidth
                   label="Title"
                   className={classes.textField}
                   error={titleFieldState.invalid}
                   helperText={titleError}
                   {...titleField}/>
        <TextField fullWidth
                   multiline
                   label="Notes"
                   className={classes.textField}
                   error={notesFieldState.invalid}
                   helperText={notesError}
                   {...notesField}/>
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
  );
}

export default BookingModelForm