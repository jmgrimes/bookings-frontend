import { faClock } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { BookableSessionEnum } from "~/features/models/bookables"

interface IBookableSessionsListProps {
    sessions: BookableSessionEnum[]
}
export default function BookableSessionsList(props: IBookableSessionsListProps) {
    const { sessions } = props
    if (sessions.length) {
        return (
            <ul className="list-group">
                {sessions.map(session => (
                    <li className="list-group-item" key={session}>
                        <FontAwesomeIcon icon={faClock} /> {session}
                    </li>
                ))}
            </ul>
        )
    }
    return <p>No available sessions configured.</p>
}
