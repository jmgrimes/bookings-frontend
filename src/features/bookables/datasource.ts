"use server"

import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"

type BookableDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
type BookableSession = 0 | 1 | 2 | 3 | 4

type Bookable = {
    id: number
    group: string
    title: string
    days: BookableDay[]
    sessions: BookableSession[]
    notes?: string
}

type BookableModel = Omit<Bookable, "id">

class BookableAPI extends RESTDataSource {
    constructor(baseURL: string, config?: DataSourceConfig) {
        super(config)
        this.baseURL = baseURL
    }

    getBookables(): Promise<Bookable[]> {
        return this.get<Bookable[]>(`/bookables`)
    }

    getBookable(id: number): Promise<Bookable> {
        return this.get<Bookable>(`/bookables/${id.toString(10)}`)
    }

    createBookable(model: BookableModel): Promise<Bookable> {
        return this.post<Bookable>(`/bookables`, { body: model })
    }

    updateBookable(bookable: Bookable): Promise<Bookable> {
        return this.put<Bookable>(`/bookables/${bookable.id.toString(10)}`, { body: bookable })
    }

    async deleteBookable(id: number): Promise<number> {
        await this.delete(`/bookables/${id.toString(10)}`)
        return id
    }
}

export default BookableAPI
