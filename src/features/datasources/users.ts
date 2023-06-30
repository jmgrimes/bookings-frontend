import { IUser, IUserProps } from "~/features/models/users"

export interface IUserApi {
    getUsers(): Promise<IUser[]>
    getUser(id: number): Promise<IUser>
    createUser(props: IUserProps): Promise<IUser>
    updateUser(id: number, props: IUserProps): Promise<IUser>
    deleteUser(id: number): Promise<number>
}

export default class UserApi implements IUserApi {
    private baseURL: string
    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async getUsers(): Promise<IUser[]> {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/users`, {
            method: "GET",
            headers,
        })
        return (await response.json()) as IUser[]
    }

    async getUser(id: number): Promise<IUser> {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/users/${id.toString(10)}`, {
            method: "GET",
            headers,
        })
        return (await response.json()) as IUser
    }

    async createUser(props: IUserProps): Promise<IUser> {
        const body = JSON.stringify(props)
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            body,
            headers,
        })
        return (await response.json()) as IUser
    }

    async updateUser(id: number, props: IUserProps): Promise<IUser> {
        const body = JSON.stringify({ id, ...props })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/users/${id.toString(10)}`, {
            method: "PUT",
            body,
            headers,
        })
        return (await response.json()) as IUser
    }

    async deleteUser(id: number): Promise<number> {
        await fetch(`${this.baseURL}/users/${id.toString(10)}`, { method: "DELETE" })
        return id
    }
}
