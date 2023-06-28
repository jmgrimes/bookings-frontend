import { Container, Nav, Navbar } from "react-bootstrap"
import { Calendar, Collection, People } from "react-bootstrap-icons"

import { ErrorMessage, LoadingMessage } from "~/components/controls"
import { UserPicker } from "~/components/users"
import { IUserView } from "~/features/models/users"
import { Consumer } from "~/features/support"

function Loading() {
    return (
        <Container>
            <LoadingMessage message="Application navigation is loading..." />
        </Container>
    )
}

interface FailedProps {
    failure?: Error
}

function Failed(props: FailedProps) {
    const { failure } = props
    return (
        <Container>
            <ErrorMessage message="Application navigation failed to load." error={failure} />
        </Container>
    )
}

interface INavigationProps {
    users: IUserView[]
    user?: IUserView
    setUser: Consumer<IUserView>
}

function Navigation(props: INavigationProps) {
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
