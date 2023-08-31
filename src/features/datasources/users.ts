import { User, UserProps } from "~/features/models/users"

export default class UserApi {
    private baseURL: string
    constructor(baseURL?: string) {
        this.baseURL = baseURL || "http://localhost:3001"
    }

    async getUsers(): Promise<User[]> {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/users`, {
            method: "GET",
            headers,
            cache: "no-store",
        })
        return (await response.json()) as User[]
    }

    async getUser(id: number): Promise<User> {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/users/${id.toString(10)}`, {
            method: "GET",
            headers,
            cache: "no-store",
        })
        return (await response.json()) as User
    }

    async createUser(props: UserProps): Promise<User> {
        const body = JSON.stringify(props)
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            body,
            headers,
            cache: "no-store",
        })
        return (await response.json()) as User
    }

    async updateUser(id: number, props: UserProps): Promise<User> {
        const body = JSON.stringify({ id, ...props })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/users/${id.toString(10)}`, {
            method: "PUT",
            body,
            headers,
            cache: "no-store",
        })
        return (await response.json()) as User
    }

    async deleteUser(id: number): Promise<number> {
        await fetch(`${this.baseURL}/users/${id.toString(10)}`, { method: "DELETE", cache: "no-store" })
        return id
    }
}
