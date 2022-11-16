import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Fragment, FunctionComponent, useEffect } from "react"
import { Container } from "react-bootstrap"

import UserCard from "./UserCard"
import UserPicker from "./UserPicker"
import UserProvider from "./UserProvider"
import UsersCard from "./UsersCard"
import { User } from "./types"
import useUser from "./useUser"

const users: User[] = [
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
    users: User[]
}

const SetupContainer: FunctionComponent<SetupContainerProps> = ({ users }) => {
    const [user, setUser] = useUser()

    useEffect(() => {
        if (!user) {
            setUser(users[0])
        }
    }, [users, user, setUser])

    return <Fragment />
}

type UserPickerContainerProps = {
    users: User[]
}

const UserPickerContainer: FunctionComponent<UserPickerContainerProps> = ({ users }) => {
    const [user, setUser] = useUser()
    if (user) {
        return (
            <Container className="p-2">
                <h4>UserPicker Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UserPicker below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UserPicker users={users} user={user} setUser={setUser} />
            </Container>
        )
    }
    return <Fragment />
}

type UsersCardContainerProps = {
    users: User[]
}

const UsersCardContainer: FunctionComponent<UsersCardContainerProps> = ({ users }) => {
    const [user, setUser] = useUser()
    if (user) {
        return (
            <Container className="p-2">
                <h4>UsersList Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UsersList below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UsersCard users={users} user={user} onSelect={setUser} />
            </Container>
        )
    }
    return <Fragment />
}

const UserCardContainer: FunctionComponent = () => {
    const [user] = useUser()
    if (user) {
        return (
            <Container className="p-2">
                <h4>UserCard Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user for supply into
                    the UserCard component below. It does not have direct access to the UserPicker or UsersList trees
                    above.
                </p>
                <UserCard user={user} />
            </Container>
        )
    }
    return <Fragment />
}

export const Default: ComponentStory<typeof UserPicker> = () => {
    return (
        <UserProvider>
            <SetupContainer users={users} />
            <UserPickerContainer users={users} />
            <UsersCardContainer users={users} />
            <UserCardContainer />
        </UserProvider>
    )
}

export default {
    component: UserProvider,
    title: "Users/Public/UserProvider",
} as ComponentMeta<typeof UserProvider>
