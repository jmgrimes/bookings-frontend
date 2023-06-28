import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"

import { BookableDayEnum } from "~/features/models/bookables"

interface BookableDaysListProps {
    days: BookableDayEnum[]
}

const BookableDaysList: FunctionComponent<BookableDaysListProps> = ({ days }) => {
    if (days.length) {
        return (
            <ListGroup>
                {days.map(day => (
                    <ListGroup.Item key={day}>
                        <Calendar /> {day}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
    return <p>No available days configured.</p>
}

export default BookableDaysList
