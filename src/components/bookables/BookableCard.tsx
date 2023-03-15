import { FunctionComponent } from "react"
import { ButtonGroup, Card, Col, Row } from "react-bootstrap"

import { Button } from "~components/application/buttons"
import { AsyncConsumer, Consumer } from "~components/application/functions"

import BookableDaysList from "./BookableDaysList"
import BookableSessionsList from "./BookableSessionsList"
import { Bookable } from "./types"

interface BookableCardProps {
    bookable: Bookable
    onEdit?: AsyncConsumer<Bookable> | Consumer<Bookable>
    onView?: AsyncConsumer<Bookable> | Consumer<Bookable>
    onDelete?: AsyncConsumer<Bookable> | Consumer<Bookable>
}

const BookableCard: FunctionComponent<BookableCardProps> = ({ bookable, onView, onEdit, onDelete }) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>{bookable.title}</Card.Title>
                <Card.Subtitle>{bookable.group}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>Notes</Card.Subtitle>
                <Card.Text>{bookable.notes}</Card.Text>
                <Card.Subtitle>Availability</Card.Subtitle>
                <Row>
                    <Col>
                        <BookableDaysList days={bookable.days} />
                    </Col>
                    <Col>
                        <BookableSessionsList sessions={bookable.sessions} />
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className={"text-center"}>
                <ButtonGroup>
                    {onView && <Button variant="view" onClick={() => onView(bookable)} />}
                    {onEdit && <Button variant="edit" onClick={() => onEdit(bookable)} />}
                    {onDelete && <Button variant="delete" onClick={() => onDelete(bookable)} />}
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default BookableCard
