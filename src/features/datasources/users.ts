import { DataSourceConfig, RESTDataSource } from "@apollo/datasource-rest"

import { IUser, IUserProps } from "~/features/models/users"

export interface IUserApi {
    getUsers(): Promise<IUser[]>
    getUser(id: number): Promise<IUser>
    createUser(props: IUserProps): Promise<IUser>
    updateUser(id: number, props: IUserProps): Promise<IUser>
    deleteUser(id: number): Promise<number>
}

export default class UserApi extends RESTDataSource implements IUserApi {
    constructor(baseURL: string, config?: DataSourceConfig) {
        super(config)
        this.baseURL = baseURL
    }

    getUsers(): Promise<IUser[]> {
        return this.get<IUser[]>(`/users`)
    }

    getUser(id: number): Promise<IUser> {
        return this.get<IUser>(`/users/${id.toString(10)}`)
    }

    createUser(props: IUserProps): Promise<IUser> {
        return this.post<IUser>(`/users`, {
            body: props,
        })
    }

    updateUser(id: number, props: IUserProps): Promise<IUser> {
        return this.put<IUser>(`/users/${id.toString(10)}`, {
            body: { id, ...props },
        })
    }

    async deleteUser(id: number): Promise<number> {
        await this.delete(`/users/${id.toString(10)}`)
        return id
    }
}
