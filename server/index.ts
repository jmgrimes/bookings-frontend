import {BookableAPI} from "./bookables/datasource";
import {BookingAPI} from "./bookings/datasource";
import {UserAPI} from "./users/datasource";
import * as BookableTypes from "./bookables/types";
import * as BookingTypes from "./bookings/types";
import * as UserTypes from "./users/types";

import {makeSchema} from "nexus";

export const dataSources = () => ({
  bookableAPI: new BookableAPI("http://localhost:3001"),
  bookingAPI: new BookingAPI("http://localhost:3001"),
  userAPI: new UserAPI("http://localhost:3001"),
});

export const schema = makeSchema({
  types: [BookableTypes, BookingTypes, UserTypes],
  shouldGenerateArtifacts: false,
});