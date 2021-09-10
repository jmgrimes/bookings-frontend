import {RESTDataSource} from "apollo-datasource-rest"

export type BookableDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type BookableSession = 0 | 1 | 2 | 3 | 4

export type BookableModel = {
  group: string
  title: string
  days: BookableDay[]
  sessions: BookableSession[]
  notes?: string
}

export type Bookable = {id: number} & BookableModel

export class BookableAPI extends RESTDataSource {
  constructor(baseURL: string) {
    super()
    this.baseURL = baseURL
  }

  getBookables(): Promise<Bookable[]> {
    return this.get<Bookable[]>(`/bookables`)
  }

  getBookable(id: number): Promise<Bookable> {
    return this.get<Bookable>(`/bookables/${id.toString(10)}`)
  }

  async createBookable(model: BookableModel): Promise<number> {
    const response = await this.post<Bookable>(`/bookables`, model)
    return response.id
  }

  async deleteBookable(id: number): Promise<number> {
    const _response = await this.delete(`/bookables/${id.toString(10)}`)
    return id
  }

  async updateBookable(bookable: Bookable): Promise<number> {
    const _response = await this.put(`/bookables/${bookable.id.toString(10)}`, bookable)
    return bookable.id
  }
}