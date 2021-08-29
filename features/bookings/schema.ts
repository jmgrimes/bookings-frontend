import { 
  intArg,
  list,
  mutationField,
  nonNull, 
  nullable,
  objectType, 
  queryField,
  stringArg,
} from "nexus";

import { 
  IBooking, 
  IBookingAPI, 
  IBookingModel, 
  IBookingsQuery,
} from "./datasource";
import {
  IBookable,
  IBookableAPI,
} from "../bookables/datasource";
import {
  IUser,
  IUserAPI,
} from "../users/datasource";

export const BookingType = objectType({
  name: "Booking",
  description: "a booking, reservation, or appointment in the bookings application",
  definition: (t) => {
    t.nonNull.int("id", {
      description: "the id of the booking, reservation, or appointment",
    });
    t.nonNull.string("title", {
      description: "the title of the booking, reservation, or appointment",
    });
    t.nonNull.string("date", {
      description: "the date on which the booking, reservation, or appointment occurs",
    });
    t.nullable.string("notes", {
      description: "the notes for the booking, reservation, or appointment",
    });
    t.field("session", {
      description: "the session during which the booking, reservation, or appointment occurs",
      type: nonNull("BookableSession"),
    });
    t.field("booker", {
      description: "the booker of the booking, reservation, or appointment",
      type: nonNull("User"),
      resolve: ({ bookerId }, _args, { dataSources }, _info): Promise<IUser> => {
        const userAPI: IUserAPI = dataSources.userAPI;
        return userAPI.getUser(bookerId);
      },
    });
    t.field("bookable", {
      description: "the bookable resource of the booking, reservation, or appointment",
      type: nonNull("Bookable"),
      resolve: ({ bookableId }, _args, { dataSources }, _info): Promise<IBookable> => {
        const bookableAPI: IBookableAPI = dataSources.bookableAPI;
        return bookableAPI.getBookable(bookableId);
      },
    });
  },
});

export const BookingQuery = queryField("booking", {
  description: "get a booking by its identifier",
  type: nullable("Booking"),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, { id }, { dataSources }, _info): Promise<IBooking> => {
    const bookingAPI: IBookingAPI = dataSources.bookingAPI;
    return bookingAPI.getBooking(id);
  },
});

export const BookingsQuery = queryField("bookings", {
  description: "get a list of bookings for a given bookable resource within a date range",
  type: nonNull(list(nonNull("Booking"))),
  args: {
    bookerId: nullable(intArg()),
    bookableId: nullable(intArg()),
    startDate: nullable(stringArg()),
    endDate: nullable(stringArg()),
  },
  resolve: (_parent, query: IBookingsQuery, { dataSources }, _info): Promise<IBooking[]> => {
    const bookingAPI: IBookingAPI = dataSources.bookingAPI;
    return bookingAPI.getBookings(query);
  },
});

export const CreateBookingMutation = mutationField("createBooking", {
  description: "add a new booking",
  type: nonNull("Int"),
  args: {
    bookerId: nonNull(intArg()),
    bookableId: nonNull(intArg()),
    title: nonNull(stringArg()),
    date: nonNull(stringArg()),
    session: nonNull("BookableSession"),
    notes: nullable(stringArg()),
  },
  resolve: (_parent, model: IBookingModel, { dataSources }, _info): Promise<number> => {
    const bookingAPI: IBookingAPI = dataSources.bookingAPI;
    return bookingAPI.createBooking(model);
  },
});

export const DeleteBookingMutation = mutationField("deleteBooking", {
  description: "delete a booking",
  type: nonNull("Int"),
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_parent, { id }, { dataSources }, _info): Promise<number> => {
    const bookingAPI: IBookingAPI = dataSources.bookingAPI;
    return bookingAPI.deleteBooking(id);
  },
});

export const UpdateBookingMutation = mutationField("updateBooking", {
  description: "update a booking",
  type: nonNull("Int"),
  args: {
    id : nonNull(intArg()),
    bookerId: nonNull(intArg()),
    bookableId: nonNull(intArg()),
    title: nonNull(stringArg()),
    date: nonNull(stringArg()),
    session: nonNull("BookableSession"),
    notes: nullable(stringArg()),
  },
  resolve: (_parent, booking: IBooking, { dataSources }, _info): Promise<number> => {
    const bookingAPI: IBookingAPI = dataSources.bookingAPI;
    return bookingAPI.updateBooking(booking);
  },
});