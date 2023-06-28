import { ButtonGroup, Card } from "react-bootstrap"

import { Button } from "~/components/controls"
import UsersList from "~/components/users/UsersList"
import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

interface IUsersCardProps {
    user: IUserView
    users: IUserView[]
    onSelect: Consumer<IUserView>
}

export default function UsersCard(props: IUsersCardProps) {
    const { user, users, onSelect } = props
    const nextUser = async () => {
        const currentIndex = users.indexOf(user)
        const nextIndex = (currentIndex + 1) % users.length
        const nextUser = users[nextIndex]
        await onSelect(nextUser)
    }

    const previousUser = async () => {
        const currentIndex = users.indexOf(user)
        const previousIndex = (users.length + currentIndex - 1) % users.length
        const previousUser = users[previousIndex]
        await onSelect(previousUser)
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
