import { Button } from "~/components/application/buttons"
import { Select } from "~/components/application/forms"
import { Bookable, BookableAction } from "~/features/bookables"

import { ChangeEvent, FunctionComponent } from "react"
import { ButtonGroup, Card } from "react-bootstrap"

import BookablesList from "./BookablesList"

type BookablesListCardProps = {
    bookable: Bookable
    bookables: Bookable[]
    onSelect: BookableAction
}

const BookablesCard: FunctionComponent<BookablesListCardProps> = ({ bookable, bookables, onSelect }) => {
    const group = bookable.group
    const groups = [...new Set(bookables.map(b => b.group))]
    const bookablesInGroup = bookables.filter(b => b.group === group)

    const changeGroup = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
        const bookablesInSelectedGroup = bookables.filter(b => b.group === event.target.value)
        return onSelect(bookablesInSelectedGroup[0])
    }

    const nextBookable = () => {
        const currentIndex = bookablesInGroup.indexOf(bookable)
        const nextIndex = (currentIndex + 1) % bookablesInGroup.length
        const nextBookable = bookablesInGroup[nextIndex]
        return onSelect(nextBookable)
    }

    const previousBookable = () => {
        const currentIndex = bookablesInGroup.indexOf(bookable)
        const previousIndex = (bookablesInGroup.length + currentIndex - 1) % bookablesInGroup.length
        const previousBookable = bookablesInGroup[previousIndex]
        return onSelect(previousBookable)
    }

    return (
        <Card>
            <Card.Header>
                <Select value={group} values={groups} onChange={changeGroup} />
            </Card.Header>
            <Card.Body>
                <BookablesList bookable={bookable} bookables={bookablesInGroup} onSelect={onSelect} />
            </Card.Body>
            <Card.Footer>
                <ButtonGroup className={"w-100"}>
                    <Button variant="previous" onClick={previousBookable} />
                    <Button variant="next" onClick={nextBookable} />
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default BookablesCard
