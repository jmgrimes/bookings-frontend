import {
  useRouter
} from "next/router"
import {
  FunctionComponent
} from "react"

import {
  LoadingCard,
  ErrorView
} from "../application"
import {
  Bookable,
  useBookable,
  useDeleteBookable,
  useUpdateBookable
} from "../../features/bookables"

import BookableForm from "./BookableForm"

type BookableEditReadyProps = {
  bookable: Bookable
}

const BookableEditReady: FunctionComponent<BookableEditReadyProps> = (props) => {
  const {bookable} = props
  const router = useRouter()
  const [onSave] = useUpdateBookable(bookable => router.push(`/bookables/${bookable.id}`))
  const [onDelete] = useDeleteBookable(() => router.push(`/bookables`))
  const onCancel = () => router.push(`/bookables/${bookable.id}`)
  return <BookableForm bookable={bookable} onSave={onSave} onDelete={onDelete} onCancel={onCancel}/>
}

const BookableEdit: FunctionComponent = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const {data, loading, error} = useBookable(id)
  if (loading) {
    return <LoadingCard/>
  }
  if (error) {
    const title = "An error occurred while loading the bookable."
    return <ErrorView title={title} message={error.message}/>
  }
  if (!data) {
    const title = "An error occurred while loading the bookable."
    const message = "An unexpected error occurred: bookable was not available when loading completed."
    return <ErrorView title={title} message={message}/>
  }
  return <BookableEditReady bookable={data.bookable}/>
}

export default BookableEdit