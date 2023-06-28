import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { BoxSeam } from "react-bootstrap-icons"

import { IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface BookablesListProps {
    bookable?: IBookableView
    bookables: IBookableView[]
    onSelect?: Consumer<IBookableView>
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
