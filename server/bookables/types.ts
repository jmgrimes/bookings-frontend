import {enumType, intArg, list, mutationField, nonNull, nullable, objectType, queryField, stringArg} from "nexus"

import {Bookable, BookableAPI} from "./datasource"
import {Booking, BookingAPI} from "../bookings/datasource"

export const BookableDayEnumType = enumType({
  name: "BookableDay",
  description: "a day on which a bookable resource can be booked",
  members: {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  }
})

export const BookableSessionEnumType = enumType({
  name: "BookableSession",
  description: "a session during which a bookable resource can be booked",
  members: {
    Breakfast: 0,
    Morning: 1,
    Lunch: 2,
    Afternoon: 3,
    Evening: 4
  }
})

export const BookableType = objectType({
  name: "Bookable",
  description: "a bookable resource in the bookings application",
  definition: (t) => {
    t.nonNull.int("id", {
      description: "the id of the bookable resource"
    })
    t.nonNull.string("group", {
      description: "the group of the bookable resource"
    })
    t.nonNull.string("title", {
      description: "the title of the bookable resource"
    })
    t.nullable.string("notes", {
      description: "the notes about the bookable resource"
    })
    t.field("days", {
      description: "the list of days on which the bookable resource can be booked",
      type: nonNull(list(nonNull("BookableDay")))
    })
    t.field("sessions", {
      description: "the list of sessions during which the bookable resource can be booked",
      type: nonNull(list(nonNull("BookableSession")))
    })
    t.field("bookings", {
      description: "the bookings made for the bookable",
      type: nonNull(list(nonNull("Booking"))),
      args: {
        bookerId: nullable(intArg()),
        startDate: nullable(stringArg()),
        endDate: nullable(stringArg())
      },
      resolve: (parent, args, {dataSources}, _info): Promise<Booking[]> => {
        const {id} = parent;
        const {bookerId, startDate, endDate} = args;
        const bookingAPI: BookingAPI = dataSources.bookingAPI
        return bookingAPI.getBookings({
          bookerId: bookerId ? bookerId : undefined,
          bookableId: id,
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined
        })
      }
    })
  }
})

export const BookableQuery = queryField("bookable", {
  description: "get a bookable by its identifier",
  type: nullable("Bookable"),
  args: {
    id: nonNull(intArg())
  },
  resolve: (_parent, args, context, _info): Promise<Bookable> => {
    const {id} = args;
    const {dataSources} = context
    const bookableAPI: BookableAPI = dataSources.bookableAPI
    return bookableAPI.getBookable(id)
  }
})

export const BookablesQuery = queryField("bookables", {
  description: "get a list of all bookables",
  type: nonNull(list(nonNull("Bookable"))),
  resolve: (_parent, _args, {dataSources }, _info): Promise<Bookable[]> => {
    const bookableAPI: BookableAPI = dataSources.bookableAPI
    return bookableAPI.getBookables()
  }
})

export const CreateBookableMutation = mutationField("createBookable", {
  description: "add a new bookable",
  type: nonNull("Int"),
  args: {
    title: nonNull(stringArg()),
    group: nonNull(stringArg()),
    notes: nullable(stringArg()),
    days: nonNull(list(nonNull("BookableDay"))),
    sessions: nonNull(list(nonNull("BookableSession")))
  },
  resolve: (_parent, args, context, _info): Promise<number> => {
    const {title, group, notes, days, sessions} = args;
    const {dataSources} = context;
    const bookableAPI: BookableAPI = dataSources.bookableAPI
    return bookableAPI.createBookable({
      title,
      group,
      notes: notes ? notes : undefined,
      days,
      sessions
    })
  }
})

export const DeleteBookableMutation = mutationField("deleteBookable", {
  description: "delete a bookable",
  type: nonNull("Int"),
  args: {
    id: nonNull(intArg())
  },
  resolve: (_parent, args, context, _info): Promise<number> => {
    const {id} = args;
    const {dataSources} = context;
    const bookableAPI: BookableAPI = dataSources.bookableAPI
    return bookableAPI.deleteBookable(id)
  }
})

export const UpdateBookableMutation = mutationField("updateBookable", {
  description: "update a bookable",
  type: nonNull("Int"),
  args: {
    id : nonNull(intArg()),
    title: nonNull(stringArg()),
    group: nonNull(stringArg()),
    notes: nullable(stringArg()),
    days: nonNull(list(nonNull("BookableDay"))),
    sessions: nonNull(list(nonNull("BookableSession")))
  },
  resolve: (_parent, args, context, _info): Promise<number> => {
    const {id, title, group, notes, days, sessions} = args;
    const {dataSources} = context;
    const bookableAPI: BookableAPI = dataSources.bookableAPI
    return bookableAPI.updateBookable({
      id,
      title,
      group,
      notes: notes ? notes : undefined,
      days,
      sessions
    })
  }
})