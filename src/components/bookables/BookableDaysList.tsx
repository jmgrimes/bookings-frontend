import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { BookableDayEnum } from "~/features/models/bookables"

interface IBookableDaysListProps {
    days: BookableDayEnum[]
}

export default function BookableDaysList(props: IBookableDaysListProps) {
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
