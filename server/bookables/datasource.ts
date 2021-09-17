import {RESTDataSource} from "apollo-datasource-rest"

export type BookableDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type BookableSession = 0 | 1 | 2 | 3 | 4

export type Bookable = {
  id: number
  group: string
  title: string
  days: BookableDay[]
  sessions: BookableSession[]
  notes?: string
}

export type BookableModel = Omit<Bookable, "id">

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

  createBookable(model: BookableModel): Promise<Bookable> {
    return this.post<Bookable>(`/bookables`, model)
  }

  updateBookable(bookable: Bookable): Promise<Bookable> {
    return this.put<Bookable>(`/bookables/${bookable.id.toString(10)}`, bookable)
  }

  async deleteBookable(id: number): Promise<number> {
    await this.delete(`/bookables/${id.toString(10)}`)
    return id
  }
}