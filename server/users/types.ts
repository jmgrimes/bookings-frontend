import {intArg, list, nonNull, nullable, objectType, queryField, stringArg} from "nexus"

import {User, UserAPI} from "./datasource"
import {Booking, BookingAPI} from "../bookings/datasource"

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
      resolve: ({id}, {bookableId, startDate, endDate}, {dataSources}, _info): Promise<Booking[]> => {
        const bookingAPI: BookingAPI = dataSources.bookingAPI
        return bookingAPI.getBookings({
          bookerId: id,
          bookableId: bookableId ? bookableId : undefined,
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined
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
  resolve: (_parent, {id}, {dataSources}, _info): Promise<User> => {
    const userAPI: UserAPI = dataSources.userAPI
    return userAPI.getUser(id)
  }
})

export const UsersQuery = queryField("users", {
  description: "get a list of all users",
  type: nonNull(list(nonNull("User"))),
  resolve: (_parent, _args, {dataSources}, _info): Promise<User[]> => {
    const userAPI: UserAPI = dataSources.userAPI
    return userAPI.getUsers()
  }
})