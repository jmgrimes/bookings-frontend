import path from "path"
import "reflect-metadata"
import { buildSchema } from "type-graphql"

import BookableResolver from "~/features/definitions/bookables"
import BookingResolver from "~/features/definitions/bookings"
import UserResolver from "~/features/definitions/users"

export * from "./context"

export async function GetSchema() {
    return await buildSchema({
        dateScalarMode: "isoDate",
        emitSchemaFile: path.join(process.cwd(), ".graphql", "schema.gql"),
        resolvers: [BookableResolver, BookingResolver, UserResolver],
    })
}
