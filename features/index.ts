import {
  GraphQLSchema,
} from "graphql"
import {
  makeSchema,
} from "nexus"
import path from "path"

import BookableAPI from "./bookables/datasource"
import BookingAPI from "./bookings/datasource"
import UserAPI from "./users/datasource"
import * as BookableDefinitions from "./bookables/definitions"
import * as BookingDefinitions from "./bookings/definitions"
import * as UserDefinitions from "./users/definitions"

type DataSources = {
  bookableAPI: BookableAPI
  bookingAPI: BookingAPI
  userAPI: UserAPI
}

type DataSourcesFactory = () => DataSources

export type Context = {
  dataSources: DataSources
}

export const dataSources: DataSourcesFactory = () => ({
  bookableAPI: new BookableAPI(process.env.BOOKABLE_API_SERVER_URI || "http://localhost:3001"),
  bookingAPI: new BookingAPI(process.env.BOOKING_API_SERVER_URI || "http://localhost:3001"),
  userAPI: new UserAPI(process.env.USER_API_SERVER_URI || "http://localhost:3001"),
})

export const schema: GraphQLSchema = makeSchema({
  types: [BookableDefinitions, BookingDefinitions, UserDefinitions],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  contextType: {
    module: path.join(process.cwd(), "features"),
    export: "Context",
  },
  outputs: {
    typegen: path.join(process.cwd(), "generated", "nexus", "bookings-typegen.ts"),
    schema: path.join(process.cwd(), "generated", "nexus", "bookings-schema.gql"),
  },
})