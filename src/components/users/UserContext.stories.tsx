import { Meta, StoryFn } from "@storybook/react"
import { Fragment, useEffect } from "react"

import { UserConsumer, UserContext, UserProvider } from "~/components/users/UserContext"
import UserCard from "~/components/users/UserCard"
import UserPicker from "~/components/users/UserPicker"
import UsersCard from "~/components/users/UsersCard"
import { User } from "~/features/models/users"

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

interface SetupContainerProps extends UserContext {
    users: User[]
}

function SetupContainer(props: SetupContainerProps) {
    const { users, user, setUser } = props
    useEffect(() => {
        if (!user) {
            setUser(users[0])
        }
    }, [users, user, setUser])

    return <Fragment />
}

interface UserPickerContainerProps extends UserContext {
    users: User[]
}

function UserPickerContainer(props: UserPickerContainerProps) {
    if (props.user) {
        return (
            <div className="container p-2">
                <h4>UserPicker Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UserPicker below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UserPicker {...props} />
            </div>
        )
    }
    return <Fragment />
}

interface UsersCardContainerProps extends UserContext {
    users: User[]
}

function UsersCardContainer(props: UsersCardContainerProps) {
    const { users, user, setUser } = props
    if (user) {
        return (
            <div className="container p-2">
                <h4>UsersCard Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user and set it based
                    on changes from the UsersCard below. If another component changes the user, this component will
                    reflect this as well.
                </p>
                <UsersCard users={users} user={user} onSelect={setUser} />
            </div>
        )
    }
    return <Fragment />
}

interface UserCardContainerProps {
    user: User | undefined
}

function UserCardContainer(props: UserCardContainerProps) {
    const { user } = props
    if (user) {
        return (
            <div className="container p-2">
                <h4>UserCard Component Tree</h4>
                <p>
                    This component tree uses the UserProvider companion hook to get the contextual user for supply into
                    the UserCard component below. It does not have direct access to the UserPicker or UsersList trees
                    above.
                </p>
                <UserCard user={user} />
            </div>
        )
    }
    return <Fragment />
}

export const Default: StoryFn<typeof UserProvider> = () => {
    return (
        <UserProvider>
            <UserConsumer>
                {userContext => {
                    const { user, setUser } = userContext
                    return (
                        <>
                            <SetupContainer users={users} user={user} setUser={setUser} />
                            <UserPickerContainer users={users} user={user} setUser={setUser} />
                            <UsersCardContainer users={users} user={user} setUser={setUser} />
                            <UserCardContainer user={user} />
                        </>
                    )
                }}
            </UserConsumer>
        </UserProvider>
    )
}

export default {
    component: UserProvider,
    title: "Users/Public/UserContext",
} as Meta<typeof UserProvider>
