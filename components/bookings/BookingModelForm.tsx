import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography, makeStyles} from "@material-ui/core"
import {Cancel, Delete, Save} from "@material-ui/icons"
import {FunctionComponent, useEffect, useMemo} from "react"
import {useController, useForm} from "react-hook-form"

import {BookingModel} from "../../features/bookings";
import {Bookable, BookableSessionEnum} from "../../features/bookables";

type OnSave = (booking: BookingModel) => void
type OnDelete = (booking: BookingModel) => void
type OnCancel = () => void

type BookingFormValues = {
  id: number
  bookerId: number
  date: string
  session: BookableSessionEnum
  title: string
  notes?: string
}

type BookingFormProps = {
  bookable: Bookable
  bookingModel: BookingModel
  onSave: OnSave
  onCancel: OnCancel
  onDelete?: OnDelete
}

const useStyles = makeStyles(() => ({
  flexSpacer: {
    flexGrow: 1
  },
  field: {
    marginBottom: 10,
    "& label": {
      fontWeight: "bold"
    }
  },
  textField: {
    marginBottom: 10
  }
}));

const toBookingModel = (values: BookingFormValues) => {
  return new BookingModel(
    values.id,
    values.bookerId,
    values.date,
    values.session,
    values.title,
    values.notes
  )
}

const fromBookingModel = (bookingModel: BookingModel) => {
  const values: BookingFormValues = {
    id: bookingModel.id || 0,
    bookerId: bookingModel.bookerId,
    date: bookingModel.date,
    session: bookingModel.session,
    title: bookingModel.title,
    notes: bookingModel.notes
  }
  return values
}

export const BookingModelForm: FunctionComponent<BookingFormProps> = (props: BookingFormProps) => {
  const {bookable, bookingModel, onCancel, onDelete, onSave} = props;
  const classes = useStyles();

  const defaultValues = useMemo(
    () => fromBookingModel(bookingModel),
    [bookingModel]
  );

  const {control, formState, handleSubmit, register, reset} = useForm({defaultValues});
  const idField = register("id", {valueAsNumber: true});
  const bookerIdField = register("bookerId", {valueAsNumber: true})
  const dateField = register("date");
  const sessionField = register("session");
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
  const titleError = titleFieldState.error?.type === "required" ? "Title is required." : null;
  const notesError = notesFieldState.invalid ? "Notes is invalid." : null;

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

  useEffect(
    () => reset(fromBookingModel(bookingModel)),
    [bookingModel, reset]
  );

  console.log(formState);

  return (
    <Card>
      <CardHeader title={onDelete ? "Edit Booking Details" : "New Booking Details"}/>
      <CardContent>
        <input type="hidden" {...idField}/>
        <input type="hidden" {...bookerIdField}/>
        <input type="hidden" {...dateField}/>
        <input type="hidden" {...sessionField}/>
        <div className={classes.field}>
          <Typography variant="body1" component="label">Bookable</Typography>
          <Typography variant="body1" component="p">{bookable.title}</Typography>
        </div>
        <TextField fullWidth
                   label="Date"
                   contentEditable={false}
                   className={classes.textField}
                   value={bookingModel.date}/>
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
  );
}