import { BaseContext } from "@apollo/server"
import { GraphQLSchema } from "graphql"
import { makeSchema } from "nexus"
import path from "path"

import BookableAPI from "./bookables/datasource"
import BookingAPI from "./bookings/datasource"
import UserAPI from "./users/datasource"
import * as BookableDefinitions from "./bookables/definitions"
import * as BookingDefinitions from "./bookings/definitions"
import * as UserDefinitions from "./users/definitions"
import { DataSourceConfig } from "@apollo/datasource-rest"

type DataSources = {
    bookableAPI: BookableAPI
    bookingAPI: BookingAPI
    userAPI: UserAPI
}

type DataSourcesFactory = (config?: DataSourceConfig) => DataSources

export interface Context extends BaseContext {
    dataSources: DataSources
}

export const dataSources: DataSourcesFactory = config => ({
    bookableAPI: new BookableAPI(process.env.BOOKABLE_API_SERVER_URI || "http://localhost:3001", config),
    bookingAPI: new BookingAPI(process.env.BOOKING_API_SERVER_URI || "http://localhost:3001", config),
    userAPI: new UserAPI(process.env.USER_API_SERVER_URI || "http://localhost:3001", config),
})

export const schema: GraphQLSchema = makeSchema({
    types: [BookableDefinitions, BookingDefinitions, UserDefinitions],
    shouldGenerateArtifacts: false,
    contextType: {
        module: path.join(process.cwd(), "src", "features"),
        export: "Context",
    },
    outputs: {
        typegen: path.join(process.cwd(), "generated", "nexus", "bookings-typegen.ts"),
        schema: path.join(process.cwd(), "generated", "nexus", "bookings-schema.gql"),
    },
})
