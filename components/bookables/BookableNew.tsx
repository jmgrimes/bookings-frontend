import {
  useRouter
} from "next/router"
import {
  FunctionComponent
} from "react"

import {
  Bookable,
  useCreateBookable
} from "../../features/bookables"

import BookableForm from "./BookableForm"

const newBookable: Bookable = {
  id: 0,
  group: "",
  title: "",
  days: [],
  sessions: []
}

const BookableNew: FunctionComponent = () => {
  const router = useRouter()
  const onCancel = () => router.push(`/bookables`)
  const [onSave] = useCreateBookable(bookable => router.push(`/bookables/${bookable.id}`))
  return <BookableForm bookable={newBookable} onSave={onSave} onCancel={onCancel}/>
}

export default BookableNew