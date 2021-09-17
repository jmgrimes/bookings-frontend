import {intArg, list, nonNull, nullable, objectType, queryField, stringArg} from "nexus"

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
      resolve: (user, args, context, _info) => {
        const {bookableId, startDate, endDate} = args
        return context.dataSources.bookingAPI.getBookings({
          bookerId: user.id,
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
  resolve: (_parent, args, context, _info) => {
    return context.dataSources.userAPI.getUser(args.id)
  }
})

export const UsersQuery = queryField("users", {
  description: "get a list of all users",
  type: nonNull(list(nonNull("User"))),
  resolve: (_parent, _args, context, _info) => {
    return context.dataSources.userAPI.getUsers()
  }
})