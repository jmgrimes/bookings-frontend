import {intArg, list, nonNull, nullable, objectType, queryField, stringArg} from "nexus"

import {IUser, IUserAPI} from "./datasource"
import {IBooking, IBookingAPI, IBookingsQuery} from "../bookings/datasource"

export const UserType = objectType({
  name: "User",
  description: "a user of the bookings application",
  definition: (t) => {
    t.nonNull.int("id", {
      description: "the unique identifier for the user"
    })
    t.nonNull.string("name", {
      description: "the name of the user"
    })
    t.nonNull.string("title", {
      description: "the title of the user"
    })
    t.nonNull.string("img", {
      description: "the avatar image of the user"
    })
    t.nullable.string("notes", {
      description: "the notes about the user"
    })
    t.field("bookings", {
      description: "the bookings made by the user",
      type: nonNull(list(nonNull("Booking"))),
      args: {
        bookableId: nullable(intArg()),
        startDate: nullable(stringArg()),
        endDate: nullable(stringArg())
      },
      resolve: ({id }, query: IBookingsQuery, {dataSources }, _info): Promise<IBooking[]> => {
        const bookingAPI: IBookingAPI = dataSources.bookingAPI
        return bookingAPI.getBookings({
          ...query, bookerId: id
        })
      }
    })
  }
})

export const UserQuery = queryField("user", {
  description: "get a user by its identifier",
  type: nullable("User"),
  args: {
    id: nonNull(intArg())
  },
  resolve: (_parent, {id }, {dataSources }, _info): Promise<IUser> => {
    const userAPI: IUserAPI = dataSources.userAPI
    return userAPI.getUser(id)
  }
})

export const UsersQuery = queryField("users", {
  description: "get a list of all users",
  type: nonNull(list(nonNull("User"))),
  resolve: (_parent, _args, {dataSources }, _info): Promise<IUser[]> => {
    const userAPI: IUserAPI = dataSources.userAPI
    return userAPI.getUsers()
  }
})