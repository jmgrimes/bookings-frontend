import "reflect-metadata"
import { buildSchema } from "type-graphql"

import BookableResolver from "~/features/graphql/bookables"
import BookingResolver from "~/features/graphql/bookings"
import UserResolver from "~/features/graphql/users"

export * from "./context"

export async function GetSchema() {
    return await buildSchema({
        resolvers: [BookableResolver, BookingResolver, UserResolver],
        emitSchemaFile: false,
    })
}
