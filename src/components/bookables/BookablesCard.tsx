"use client"

import { ChangeEvent } from "react"

import BookablesList from "~/components/bookables/BookablesList"
import { Button, Select } from "~/components/controls"
import { Bookable } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

export interface BookablesCardProps {
    bookable: Bookable
    bookables: Bookable[]
    onSelect: Consumer<Bookable>
}

export default function BookablesCard(props: BookablesCardProps) {
    const { bookable, bookables, onSelect } = props
    const group = bookable.group
    const groups = [...new Set(bookables.map(b => b.group))]
    const bookablesInGroup = bookables.filter(b => b.group === group)

    const changeGroup = async (event: ChangeEvent<{ name?: string; value: unknown }>) => {
        const bookablesInSelectedGroup = bookables.filter(b => b.group === event.target.value)
        await onSelect(bookablesInSelectedGroup[0])
    }

    const nextBookable = async () => {
        const currentIndex = bookablesInGroup.findIndex(b => b.id === bookable.id)
        const nextIndex = (currentIndex + 1) % bookablesInGroup.length
        const nextBookable = bookablesInGroup[nextIndex]
        await onSelect(nextBookable)
    }

    const previousBookable = async () => {
        const currentIndex = bookablesInGroup.findIndex(b => b.id === bookable.id)
        const previousIndex = (bookablesInGroup.length + currentIndex - 1) % bookablesInGroup.length
        const previousBookable = bookablesInGroup[previousIndex]
        await onSelect(previousBookable)
    }

    return (
        <div className="card">
            <div className="card-header">
                <Select value={group} values={groups} onChange={changeGroup} />
            </div>
            <div className="card-body">
                <BookablesList bookable={bookable} bookables={bookablesInGroup} onSelect={onSelect} />
            </div>
            <div className="card-footer">
                <div className={"btn-group w-100"}>
                    <Button variant="previous" onClick={previousBookable} />
                    <Button variant="next" onClick={nextBookable} />
                </div>
            </div>
        </div>
    )
}
