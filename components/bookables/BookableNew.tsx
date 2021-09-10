import {useRouter} from "next/router"
import {FunctionComponent} from "react"

import {BookableForm} from "./BookableForm"
import {Bookable} from "../../features/bookables"

export const BookableNew: FunctionComponent = () => {
  const router = useRouter()
  const bookable: Bookable = {
    id: 0,
    group: "",
    title: "",
    notes: "",
    days: [],
    sessions: []
  }
  return (
    <BookableForm
      bookable={bookable}
      onSave={() => router.push(`/bookables`)}
      onCancel={() => router.push(`/bookables`)}
    />
  )
}