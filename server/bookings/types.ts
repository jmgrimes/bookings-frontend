import {
  intArg,
  list,
  mutationField,
  nonNull,
  nullable,
  objectType,
  queryField,
  stringArg
} from "nexus"

export const BookingType = objectType({
  name: "Booking",
  description: "a booking, reservation, or appointment in the bookings application",
  definition: (t) => {
    t.nonNull.int("id", {
      description: "the id of the booking, reservation, or appointment"
    })
    t.nonNull.int("bookerId", {
      description: "the id of the booking user for the booking, reservation, or appointment"
    })
    t.nonNull.int("bookableId", {
      description: "the id of the bookable for the booking, reservation, or appointment"
    })
    t.nonNull.string("title", {
      description: "the title of the booking, reservation, or appointment"
    })
    t.nonNull.string("date", {
      description: "the date on which the booking, reservation, or appointment occurs"
    })
    t.nullable.string("notes", {
      description: "the notes for the booking, reservation, or appointment"
    })
    t.field("session", {
      description: "the session during which the booking, reservation, or appointment occurs",
      type: nonNull("BookableSession")
    })
    t.field("booker", {
      description: "the booker of the booking, reservation, or appointment",
      type: nonNull("User"),
      resolve: (booking, _args, context, _info) => {
        return context.dataSources.userAPI.getUser(booking.bookerId)
      }
    })
    t.field("bookable", {
      description: "the bookable resource of the booking, reservation, or appointment",
      type: nonNull("Bookable"),
      resolve: (booking, _args, context, _info) => {
        return context.dataSources.bookableAPI.getBookable(booking.bookableId)
      }
    })
  }
})

export const BookingQuery = queryField("booking", {
  description: "get a booking by its identifier",
  type: nullable("Booking"),
  args: {
    id: nonNull(intArg())
  },
  resolve: (_parent, args, context, _info) => {
    return context.dataSources.bookingAPI.getBooking(args.id)
  }
})

export const BookingsQuery = queryField("bookings", {
  description: "get a list of bookings for a given bookable resource within a date range",
  type: nonNull(list(nonNull("Booking"))),
  args: {
    bookerId: nullable(intArg()),
    bookableId: nullable(intArg()),
    startDate: nullable(stringArg()),
    endDate: nullable(stringArg())
  },
  resolve: (_parent, args, context, _info) => {
    const {bookerId, bookableId, startDate, endDate} = args
    return context.dataSources.bookingAPI.getBookings({
      bookerId: bookerId ? bookerId : undefined,
      bookableId: bookableId ? bookableId : undefined,
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined
    })
  }
})

export const CreateBookingMutation = mutationField("createBooking", {
  description: "add a new booking",
  type: nonNull("Booking"),
  args: {
    bookerId: nonNull(intArg()),
    bookableId: nonNull(intArg()),
    title: nonNull(stringArg()),
    date: nonNull(stringArg()),
    session: nonNull("BookableSession"),
    notes: nullable(stringArg())
  },
  resolve: (_parent, args, context, _info) => {
    return context.dataSources.bookingAPI.createBooking({
      ...args,
      notes: args.notes ? args.notes : undefined
    })
  }
})

export const DeleteBookingMutation = mutationField("deleteBooking", {
  description: "delete a booking",
  type: nonNull("Int"),
  args: {
    id: nonNull(intArg())
  },
  resolve: (_parent, args, context, _info) => {
    return context.dataSources.bookingAPI.deleteBooking(args.id)
  }
})

export const UpdateBookingMutation = mutationField("updateBooking", {
  description: "update a booking",
  type: nonNull("Booking"),
  args: {
    id : nonNull(intArg()),
    bookerId: nonNull(intArg()),
    bookableId: nonNull(intArg()),
    title: nonNull(stringArg()),
    date: nonNull(stringArg()),
    session: nonNull("BookableSession"),
    notes: nullable(stringArg())
  },
  resolve: (_parent, args, context, _info) => {
    return context.dataSources.bookingAPI.updateBooking({
      ...args,
      notes: args.notes ? args.notes : undefined
    })
  }
})