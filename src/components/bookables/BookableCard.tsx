import { ButtonGroup, Card, Col, Row } from "react-bootstrap"

import BookableDaysList from "~/components/bookables/BookableDaysList"
import BookableSessionsList from "~/components/bookables/BookableSessionsList"
import { Button } from "~/components/controls"
import { IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface IBookableCardProps {
    bookable: IBookableView
    onEdit?: Consumer<IBookableView>
    onView?: Consumer<IBookableView>
    onDelete?: Consumer<IBookableView>
}

export default function BookableCard(props: IBookableCardProps) {
    const { bookable, onView, onEdit, onDelete } = props
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
