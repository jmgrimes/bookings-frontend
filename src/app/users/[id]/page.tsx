import { UserView } from "~/components/users"
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
    return <UserView user={user} users={users} />
}
