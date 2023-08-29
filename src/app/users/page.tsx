import { notFound, redirect } from "next/navigation"
import UserApi from "~/features/datasources/users"

const userApi = new UserApi()

async function getUser() {
    const users = await userApi.getUsers()
    return users ? users[0] : undefined
}

export default async function UsersPage() {
    const user = await getUser()
    if (user) {
        redirect(`/users/${user.id}`)
    } else {
        notFound()
    }
}
