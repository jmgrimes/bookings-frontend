import { FunctionComponent } from "react"
import { ButtonGroup, Card } from "react-bootstrap"

import { Button } from "~/components/controls"
import { Consumer } from "~/features/support"

import { User } from "./types"

interface UserDetailsProps {
    user: User
    onView?: Consumer<User>
    onEdit?: Consumer<User>
    onDelete?: Consumer<User>
}

const UserCard: FunctionComponent<UserDetailsProps> = ({ user, onView, onEdit, onDelete }) => {
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

export default UserCard
