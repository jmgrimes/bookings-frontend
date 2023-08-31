import { Bookable, BookableDay, BookableProps, BookableSession } from "~/features/models/bookables"

export interface BookableResource {
    id: number
    group: string
    title: string
    notes?: string
    days: number[]
    sessions: number[]
}

export default class BookableApi {
    private baseURL: string
    constructor(baseURL?: string) {
        this.baseURL = baseURL || "http://localhost:3001"
    }

    async getBookables() {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookables`, {
            method: "GET",
            headers,
            cache: "no-store",
        })
        const resources = (await response.json()) as BookableResource[]
        return resources.map(resource => ({
            ...resource,
            days: resource.days.map(day => BookableDay.values[day]),
            sessions: resource.sessions.map(session => BookableSession.values[session]),
        })) as Bookable[]
    }

    async getBookable(id: number) {
        const headers = new Headers()
        headers.append("Accept", "application/json")
        const response = await fetch(`${this.baseURL}/bookables/${id}`, {
            method: "GET",
            headers,
            cache: "no-store",
        })
        const resource = (await response.json()) as BookableResource
        return {
            ...resource,
            days: resource.days.map(day => BookableDay.values[day]),
            sessions: resource.sessions.map(session => BookableSession.values[session]),
        } as Bookable
    }

    async createBookable(props: BookableProps) {
        const body = JSON.stringify({
            ...props,
            days: props.days.map(day => BookableDay.values.findIndex(d => d.toString() === day)),
            sessions: props.sessions.map(session => BookableSession.values.findIndex(s => s.toString() === session)),
        })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookables`, {
            method: "POST",
            body,
            headers,
            cache: "no-store",
        })
        const resource = (await response.json()) as BookableResource
        return {
            ...resource,
            days: resource.days.map(day => BookableDay.values[day]),
            sessions: resource.sessions.map(session => BookableSession.values[session]),
        } as Bookable
    }

    async updateBookable(id: number, props: BookableProps) {
        const body = JSON.stringify({
            id,
            ...props,
            days: props.days.map(day => BookableDay.values.findIndex(d => d.toString() === day)),
            sessions: props.sessions.map(session => BookableSession.values.findIndex(s => s.toString() === session)),
        })
        const headers = new Headers()
        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Content-Length", body.length.toString(10))
        const response = await fetch(`${this.baseURL}/bookables/${id}`, {
            method: "PUT",
            body,
            headers,
            cache: "no-store",
        })
        const resource = (await response.json()) as BookableResource
        return {
            ...resource,
            days: resource.days.map(day => BookableDay.values[day]),
            sessions: resource.sessions.map(session => BookableSession.values[session]),
        } as Bookable
    }

    async deleteBookable(id: number) {
        await fetch(`${this.baseURL}/bookables/${id}`, { method: "DELETE", cache: "no-store" })
        return id
    }
}
