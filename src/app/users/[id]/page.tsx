import { redirect } from "next/navigation"

import { UserCard, UsersCard } from "~/components/users"
import UserApi from "~/features/datasources/users"

const userApi = new UserApi()

async function getUsers() {
    return await userApi.getUsers()
}

async function getUser(id: number) {
    return await userApi.getUser(id)
}

export interface UserPageProps {
    params: {
        id: number
    }
}

export default async function UserPage(props: UserPageProps) {
    const user = await getUser(props.params.id)
    const users = await getUsers()
    return (
        <div className="container">
            <div className="row">
                <section className="col col-3">
                    <UsersCard
                        user={user}
                        users={users}
                        onSelect={async user => {
                            "use server"
                            redirect(`/users/${user.id}`)
                        }}
                    />
                </section>
                <section className="col">
                    <UserCard user={user} />
                </section>
            </div>
        </div>
    )
}
