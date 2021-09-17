import {useRouter} from "next/router"
import {FunctionComponent} from "react"

import {BookableForm} from "./BookableForm"
import {Bookable, useCreateBookable} from "../../features/bookables"

const newBookable: Bookable = {
  id: 0,
  group: "",
  title: "",
  days: [],
  sessions: []
}

export const BookableNew: FunctionComponent = () => {
  const router = useRouter()
  const [createBookable] = useCreateBookable(bookable => router.push(`/bookables/${bookable.id}`))
  const onCancel = () => router.push(`/bookables`)
  return (
    <BookableForm bookable={newBookable} onSave={createBookable} onCancel={onCancel}/>
  )
}