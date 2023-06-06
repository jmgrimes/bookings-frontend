import { FunctionComponent } from "react"
import { ButtonGroup, Card } from "react-bootstrap"

import { Button } from "~components/controls"
import { Consumer } from "~support"

import UsersList from "./UsersList"
import { User } from "./types"

interface UsersListCardProps {
    user: User
    users: User[]
    onSelect: Consumer<User>
}

const UsersCard: FunctionComponent<UsersListCardProps> = ({ user, users, onSelect }) => {
    const nextUser = async () => {
        const currentIndex = users.indexOf(user)
        const nextIndex = (currentIndex + 1) % users.length
        const nextUser = users[nextIndex]
        return await onSelect(nextUser)
    }

    const previousUser = async () => {
        const currentIndex = users.indexOf(user)
        const previousIndex = (users.length + currentIndex - 1) % users.length
        const previousUser = users[previousIndex]
        return await onSelect(previousUser)
    }

    return (
        <Card>
            <Card.Body>
                <UsersList user={user} users={users} onSelect={onSelect} />
            </Card.Body>
            <Card.Footer>
                <ButtonGroup className={"w-100"}>
                    <Button variant="previous" onClick={previousUser} />
                    <Button variant="next" onClick={nextUser} />
                </ButtonGroup>
            </Card.Footer>
        </Card>
    )
}

export default UsersCard
