import { FunctionComponent } from "react"
import { ButtonGroup, Card } from "react-bootstrap"

import { Button } from "~components/application/buttons"
import { AsyncConsumer, Consumer } from "~components/application/functions"

import UsersList from "./UsersList"
import { User } from "./types"

type UsersListCardProps = {
    user: User
    users: User[]
    onSelect: AsyncConsumer<User> | Consumer<User>
}

const UsersCard: FunctionComponent<UsersListCardProps> = ({ user, users, onSelect }) => {
    const nextUser = () => {
        const currentIndex = users.indexOf(user)
        const nextIndex = (currentIndex + 1) % users.length
        const nextUser = users[nextIndex]
        return onSelect(nextUser)
    }

    const previousUser = () => {
        const currentIndex = users.indexOf(user)
        const previousIndex = (users.length + currentIndex - 1) % users.length
        const previousUser = users[previousIndex]
        return onSelect(previousUser)
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
