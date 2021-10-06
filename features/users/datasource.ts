import {
  RESTDataSource,
} from "apollo-datasource-rest"

type User = {
  id: number
  name: string
  title: string
  img: string
  notes?: string
}

class UserAPI extends RESTDataSource {
  constructor(baseURL: string) {
    super()
    this.baseURL = baseURL
  }

  getUsers(): Promise<User[]> {
    return this.get<User[]>(`/users`)
  }

  getUser(id: number): Promise<User> {
    return this.get<User>(`/users/${id.toString(10)}`)
  }
}

export default UserAPI