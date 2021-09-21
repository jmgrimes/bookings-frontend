import {
  GraphQLSchema
} from "graphql"
import {
  makeSchema
} from "nexus"
import path from "path"

import BookableAPI from "./bookables/datasource"
import BookingAPI from "./bookings/datasource"
import UserAPI from "./users/datasource"
import * as BookableTypes from "./bookables/types"
import * as BookingTypes from "./bookings/types"
import * as UserTypes from "./users/types"

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
  userAPI: new UserAPI(process.env.USER_API_SERVER_URI || "http://localhost:3001")
})

export const schema: GraphQLSchema = makeSchema({
  types: [BookableTypes, BookingTypes, UserTypes],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  contextType: {
    module: path.join(process.cwd(), "server"),
    export: "Context"
  },
  outputs: {
    typegen: path.join(process.cwd(), "generated", "nexus", "bookings-typegen.ts"),
    schema: path.join(process.cwd(), "generated", "nexus", "bookings-schema.gql")
  }
})