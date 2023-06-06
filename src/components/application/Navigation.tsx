import { FunctionComponent } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Calendar, Collection, People } from "react-bootstrap-icons"

import { ErrorMessage, LoadingMessage } from "~components/controls"
import { User, UserPicker } from "~components/users"
import { Consumer } from "~support"

const Loading: FunctionComponent = () => {
    return (
        <Container>
            <LoadingMessage message="Application navigation is loading..." />
        </Container>
    )
}

interface FailedProps {
    failure?: Error
}

const Failed: FunctionComponent<FailedProps> = props => {
    const { failure } = props
    return (
        <Container>
            <ErrorMessage message="Application navigation failed to load." error={failure} />
        </Container>
    )
}

interface NavigationProps {
    users: User[]
    user?: User
    setUser: Consumer<User>
}

const Navigation: FunctionComponent<NavigationProps> = props => {
    const { users, user, setUser } = props
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand key="/home" href="/">
                    Bookings
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link key="/bookings" href="/bookings">
                            <Calendar /> Bookings
                        </Nav.Link>
                        <Nav.Link key="/bookables" href="/bookables">
                            <Collection /> Bookables
                        </Nav.Link>
                        <Nav.Link key="/users" href="/users">
                            <People /> Users
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    <UserPicker users={users} user={user} setUser={setUser} />
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Object.assign(Navigation, {
    Loading,
    Failed,
})
