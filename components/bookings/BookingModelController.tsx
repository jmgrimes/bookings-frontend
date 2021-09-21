import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState
} from "react"

import {
  Bookable
} from "../../features/bookables"
import {
  BookingModel,
  useCreateBooking,
  useDeleteBooking,
  useUpdateBooking
} from "../../features/bookings"
import {
  useUser
} from "../../features/users"

import BookingModelDetails from "./BookingModelDetails"
import BookingModelForm from "./BookingModelForm"

type BookingControllerProps = {
  bookable: Bookable
  bookingModel?: BookingModel
  setBookingModel: Dispatch<SetStateAction<BookingModel | undefined>>
}

const BookingModelController: FunctionComponent<BookingControllerProps> = (props) => {
  const {bookable, bookingModel, setBookingModel} = props
  const isUpdate = bookingModel?.id !== 0

  const [user] = useUser()
  const [isEditing, setIsEditing] = useState(false)

  const [createBooking] = useCreateBooking((booking) => {
    setIsEditing(false)
    setBookingModel(BookingModel.fromBooking(booking))
  })

  const [updateBooking] = useUpdateBooking((booking) => {
    setIsEditing(false)
    setBookingModel(BookingModel.fromBooking(booking))
  })

  const [deleteBooking] = useDeleteBooking(()=> {
    setIsEditing(false)
    setBookingModel(undefined)
  })

  useEffect(
    () => setIsEditing(false),
    [bookable, bookingModel, user, setIsEditing]
  );

  const onSave = (newBookingModel: BookingModel) => {
    const booking = newBookingModel.toBooking(bookable)
    if (isUpdate) {
      return updateBooking(booking)
    }
    else {
      return createBooking(booking)
    }
  }

  const onDelete = (bookingModel: BookingModel) => {
    const booking = bookingModel.toBooking(bookable)
    return deleteBooking(booking)
  }

  if (bookingModel && isEditing) {
    return (
      <BookingModelForm bookable={bookable} bookingModel={bookingModel}
                        onSave={onSave} onDelete={isUpdate ? onDelete : undefined}
                        onCancel={() => setIsEditing(false)}
      />
    )
  }
  return <BookingModelDetails bookable={bookable} bookingModel={bookingModel} onEdit={() => setIsEditing(true)}/>
}

export default BookingModelController