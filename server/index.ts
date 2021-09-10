import {makeSchema} from "nexus"
import path from "path"

import {BookableAPI} from "./bookables/datasource"
import {BookingAPI} from "./bookings/datasource"
import {UserAPI} from "./users/datasource"
import * as BookableTypes from "./bookables/types"
import * as BookingTypes from "./bookings/types"
import * as UserTypes from "./users/types"

export const dataSources = () => ({
  bookableAPI: new BookableAPI("http://localhost:3001"),
  bookingAPI: new BookingAPI("http://localhost:3001"),
  userAPI: new UserAPI("http://localhost:3001")
})

export const schema = makeSchema({
  types: [BookableTypes, BookingTypes, UserTypes],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    typegen: path.join(process.cwd(), "generated", "nexus", "bookings-typegen.ts"),
    schema: path.join(process.cwd(), "generated", "nexus", "bookings-schema.gql")
  }
})