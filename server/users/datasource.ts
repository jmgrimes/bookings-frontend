import {RESTDataSource} from "apollo-datasource-rest"

export interface IUser {
  id: number
  name: string
  title: string
  img: string
  notes: string | undefined
}

export interface IUserAPI {
  getUsers: () => Promise<IUser[]>
  getUser: (id: number) => Promise<IUser>
}

export class UserAPI extends RESTDataSource implements IUserAPI {
  constructor(baseURL: string) {
    super()
    this.baseURL = baseURL
  }

  getUsers(): Promise<IUser[]> {
    return this.get<IUser[]>(`/users`)
  }

  getUser(id: number): Promise<IUser> {
    return this.get<IUser>(`/users/${id.toString(10)}`)
  }
}