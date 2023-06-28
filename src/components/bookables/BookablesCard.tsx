import { ChangeEvent, FunctionComponent } from "react"
import { ButtonGroup, Card } from "react-bootstrap"

import BookablesList from "~/components/bookables/BookablesList"
import { Button, Select } from "~/components/controls"
import { IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface BookablesListCardProps {
    bookable: IBookableView
    bookables: IBookableView[]
    onSelect: Consumer<IBookableView>
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
