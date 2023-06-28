import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"

import { IBookable, IBookableProps } from "~/features/models/bookables"

export interface IBookableApi {
    getBookables(): Promise<IBookable[]>
    getBookable(id: number): Promise<IBookable>
    createBookable(props: IBookableProps): Promise<IBookable>
    updateBookable(id: number, props: IBookableProps): Promise<IBookable>
    deleteBookable(id: number): Promise<number>
}

export default class BookableApi extends RESTDataSource implements IBookableApi {
    constructor(baseURL: string, config?: DataSourceConfig) {
        super(config)
        this.baseURL = baseURL
    }

    async getBookables() {
        return this.get<IBookable[]>(`/bookables`)
    }

    async getBookable(id: number) {
        return this.get<IBookable>(`/bookables/${id.toString(10)}`)
    }

    async createBookable(props: IBookableProps) {
        return this.post<IBookable>(`/bookables`, {
            body: props,
        })
    }

    async updateBookable(id: number, props: IBookableProps) {
        return this.put<IBookable>(`/bookables/${id.toString(10)}`, {
            body: { id, ...props },
        })
    }

    async deleteBookable(id: number) {
        await this.delete(`/bookables/${id.toString(10)}`)
        return id
    }
}
