import UserApi, { IUserApi } from "~/features/datasources/users"

const userApi: IUserApi = new UserApi()

export async function GET() {
    return userApi.getUsers()
}
