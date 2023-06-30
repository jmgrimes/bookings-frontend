import BookableApi, { IBookableApi } from "~/features/datasources/bookables"
import BookingApi, { IBookingApi } from "~/features/datasources/bookings"
import UserApi, { IUserApi } from "~/features/datasources/users"

const defaultEndpoint = "http://localhost:3001"

export interface Context {
    dataSources: DataSources
}

export interface DataSources {
    bookableApi: IBookableApi
    bookingApi: IBookingApi
    userApi: IUserApi
}

export function GetDataSources() {
    return {
        bookableApi: new BookableApi(process.env.BOOKABLE_API_SERVER_URI || defaultEndpoint),
        bookingApi: new BookingApi(process.env.BOOKING_API_SERVER_URI || defaultEndpoint),
        userApi: new UserApi(process.env.USER_API_SERVER_URI || defaultEndpoint),
    } as DataSources
}
