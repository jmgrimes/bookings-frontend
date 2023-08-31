import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { BookableDayEnum } from "~/features/models/bookables"

export interface BookableDaysListProps {
    days: BookableDayEnum[]
}

export default function BookableDaysList(props: BookableDaysListProps) {
    const { days } = props
    if (days.length) {
        return (
            <ul className="list-group">
                {days.map(day => (
                    <li className="list-group-item" key={day}>
                        <FontAwesomeIcon icon={faCalendar} /> {day}
                    </li>
                ))}
            </ul>
        )
    }
    return <p>No available days configured.</p>
}
