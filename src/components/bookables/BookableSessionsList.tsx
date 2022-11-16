import { FunctionComponent } from "react"
import { ListGroup } from "react-bootstrap"
import { Clock } from "react-bootstrap-icons"

import { BookableSessionEnum } from "./types"

type BookableSessionsListProps = {
    sessions: BookableSessionEnum[]
}
const BookableSessionsList: FunctionComponent<BookableSessionsListProps> = ({ sessions }) => {
    if (sessions.length) {
        return (
            <ListGroup>
                {sessions.map(session => (
                    <ListGroup.Item key={session}>
                        <Clock /> {session}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
    return <p>No available sessions configured.</p>
}

export default BookableSessionsList
