import { IBookable, IBookableProps } from "~/features/models/bookables"

export interface IBookableApi {
    getBookables(): Promise<IBookable[]>
    getBookable(id: number): Promise<IBookable>
    createBookable(props: IBookableProps): Promise<IBookable>
    updateBookable(id: number, props: IBookableProps): Promise<IBookable>
    deleteBookable(id: number): Promise<number>
}

export default class BookableApi implements IBookableApi {
    private baseURL: string
    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async getBookables() {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookables`, {
            method: "GET",
            headers,
        })
        return (await response.json()) as IBookable[]
    }

    async getBookable(id: number) {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookables/${id.toString(10)}`, {
            method: "GET",
            headers,
        })
        return (await response.json()) as IBookable
    }

    async createBookable(props: IBookableProps) {
        const body = JSON.stringify(props)
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookables`, {
            method: "POST",
            body,
            headers,
        })
        return (await response.json()) as IBookable
    }

    async updateBookable(id: number, props: IBookableProps) {
        const body = JSON.stringify({ id, ...props })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookables/${id.toString(10)}`, {
            method: "PUT",
            body,
            headers,
        })
        return (await response.json()) as IBookable
    }

    async deleteBookable(id: number) {
        await fetch(`${this.baseURL}/bookables/${id.toString(10)}`, { method: "DELETE" })
        return id
    }
}
