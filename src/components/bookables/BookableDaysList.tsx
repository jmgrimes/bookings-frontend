import { ListGroup } from "react-bootstrap"
import { Calendar } from "react-bootstrap-icons"

import { BookableDayEnum } from "~/features/models/bookables"

interface IBookableDaysListProps {
    days: BookableDayEnum[]
}

export default function BookableDaysList(props: IBookableDaysListProps) {
    const { days } = props
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
