import { DataSourceConfig } from "@apollo/datasource-rest"
import { BaseContext } from "@apollo/server"

import BookableApi, { IBookableApi } from "~/features/datasources/bookables"
import BookingApi, { IBookingApi } from "~/features/datasources/bookings"
import UserApi, { IUserApi } from "~/features/datasources/users"

const defaultEndpoint = "http://localhost:3001"

export interface Context extends BaseContext {
    dataSources: DataSources
}

export interface DataSources {
    bookableApi: IBookableApi
    bookingApi: IBookingApi
    userApi: IUserApi
}

export async function GetDataSources(config: DataSourceConfig) {
    return {
        bookableApi: new BookableApi(process.env.BOOKABLE_API_SERVER_URI || defaultEndpoint, config),
        bookingApi: new BookingApi(process.env.BOOKING_API_SERVER_URI || defaultEndpoint, config),
        userApi: new UserApi(process.env.USER_API_SERVER_URI || defaultEndpoint, config),
    } as DataSources
}
