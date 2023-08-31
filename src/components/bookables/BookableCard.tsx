"use client"

import { useState } from "react"

import BookableForm from "~/components/bookables/BookableForm"
import BookableView, { BookableViewProps } from "~/components/bookables/BookableView"
import { Bookable, BookableProps } from "~/features/models/bookables"

export interface BookableCardProps {
    bookable: Bookable
    onSave?: (props: BookableProps) => Promise<Bookable>
    onDelete?: () => Promise<number>
}

export default function BookableCard(props: BookableCardProps) {
    const { onSave, onDelete } = props
    const [bookable, setBookable] = useState<Bookable>(props.bookable)
    const [isEditing, setEditing] = useState<boolean>(false)

    if (isEditing && onSave) {
        const onCancelHandler = () => setEditing(false)
        const onSaveHandler = async (props: BookableProps) => {
            const bookable = await onSave(props)
            setEditing(false)
            setBookable(bookable)
        }
        return <BookableForm bookable={bookable} onSave={onSaveHandler} onCancel={onCancelHandler} />
    }

    const bookableViewProps: BookableViewProps = {
        bookable,
        onEdit: onSave ? () => setEditing(true) : undefined,
        onDelete: onDelete
            ? async () => {
                  const confirmed = confirm("Are you sure that you want to delete this bookable?")
                  if (confirmed) {
                      await onDelete()
                  }
              }
            : undefined,
    }
    return <BookableView {...bookableViewProps} />
}
