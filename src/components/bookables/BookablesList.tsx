import { Bookable, BookableAction } from "~/features/bookables"

import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { BoxSeam } from "react-bootstrap-icons"

type BookablesListProps = {
    bookable?: Bookable
    bookables: Bookable[]
    onSelect?: BookableAction
}

const BookablesList: FunctionComponent<BookablesListProps> = ({ bookable, bookables, onSelect }) => {
    return (
        <ListGroup>
            {bookables.map(b => (
                <ListGroup.Item key={b.id} active={b.id === bookable?.id} onClick={() => (onSelect ? onSelect(b) : {})}>
                    <BoxSeam /> {b.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default BookablesList
