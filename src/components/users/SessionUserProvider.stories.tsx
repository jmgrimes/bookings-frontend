import { Meta, StoryFn } from "@storybook/react"
import { Fragment, FunctionComponent, useEffect } from "react"
import { Container } from "react-bootstrap"

import SessionUserProvider from "~/components/users/SessionUserProvider"
import UserCard from "~/components/users/UserCard"
import UserPicker from "~/components/users/UserPicker"
import UsersCard from "~/components/users/UsersCard"
import { useSessionUser } from "~/features/api/users"
import { IUserView } from "~/features/models/users"

const users: IUserView[] = [
    {
        id: 1,
        name: "John Doe",
        title: "Demonstration Doctor",
        notes: "A sample user object, John Doe is the perfect demonstration persona.",
    },
    {
        id: 2,
        name: "Jane Doe",
        title: "Example Engineer",
        notes: "A sample user object, Jane Doe is engineers great examples.",
    },
    {
        id: 3,
        name: "Jim Doe",
        title: "Sample Sultan",
        notes: "A sample user object, Jim Doe presides over all other sample data.",
    },
]

type SetupContainerProps = {
    users: IUserView[]
}

const SetupContainer: FunctionComponent<SetupContainerProps> = ({ users }) => {
    const [user, setUser] = useSessionUser()

    useEffect(() => {
        if (!user) {
            setUser(users[0])
        }
    }, [users, user, setUser])

    return <Fragment />
}

type UserPickerContainerProps = {
    users: IUserView[]
}

const UserPickerContainer: FunctionComponent<UserPickerContainerProps> = ({ users }) => {
    const [sessionUser, setSessionUser] = useSessionUser()
    if (sessionUser) {
        return (
            <Container className="p-2">
                <h4>UserPicker Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UserPicker below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UserPicker users={users} user={sessionUser} setUser={setSessionUser} />
            </Container>
        )
    }
    return <Fragment />
}

type UsersCardContainerProps = {
    users: IUserView[]
}

const UsersCardContainer: FunctionComponent<UsersCardContainerProps> = ({ users }) => {
    const [sessionUser, setSessionUser] = useSessionUser()
    if (sessionUser) {
        return (
            <Container className="p-2">
                <h4>UsersCard Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UsersCard below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UsersCard users={users} user={sessionUser} onSelect={setSessionUser} />
            </Container>
        )
    }
    return <Fragment />
}

const UserCardContainer: FunctionComponent = () => {
    const [sessionUser] = useSessionUser()
    if (sessionUser) {
        return (
            <Container className="p-2">
                <h4>UserCard Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user for supply into
                    the UserCard component below. It does not have direct access to the UserPicker or UsersList trees
                    above.
                </p>
                <UserCard user={sessionUser} />
            </Container>
        )
    }
    return <Fragment />
}

export const Default: StoryFn<typeof UserPicker> = () => {
    return (
        <SessionUserProvider>
            <SetupContainer users={users} />
            <UserPickerContainer users={users} />
            <UsersCardContainer users={users} />
            <UserCardContainer />
        </SessionUserProvider>
    )
}

export default {
    component: SessionUserProvider,
    title: "Users/Public/SessionUserProvider",
} as Meta<typeof SessionUserProvider>
