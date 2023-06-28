import { ButtonGroup, Card } from "react-bootstrap"

import { Button } from "~/components/controls"
import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface IUserCardProps {
    user: IUserView
    onView?: Consumer<IUserView>
    onEdit?: Consumer<IUserView>
    onDelete?: Consumer<IUserView>
}

export default function UserCard(props: IUserCardProps) {
    const { user, onView, onEdit, onDelete } = props
    return (
        <Card>
            <Card.Header>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle>{user.title}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>Notes</Card.Subtitle>
                <Card.Text>{user.notes}</Card.Text>
            </Card.Body>
            <Card.Footer className={"text-center"}>
                <ButtonGroup>
                    {onView && <Button variant="view" onClick={() => onView(user)} />}
                    {onEdit && <Button variant="edit" onClick={() => onEdit(user)} />}
                    {onDelete && <Button variant="delete" onClick={() => onDelete(user)} />}
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}
