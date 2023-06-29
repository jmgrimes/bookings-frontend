import { GraphQLScalarType, Kind } from "graphql"
import { DateTime } from "luxon"

export const DateTimeScalar = new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime scalar type",
    serialize(value: unknown) {
        if (!(value instanceof DateTime)) {
            throw new Error("DateTimeScalar can only serialize DateTime values.")
        }
        return value.toISOTime()
    },
    parseValue(value: unknown) {
        if (typeof value !== "string") {
            throw new Error("DateTimeScalar can only parse string values")
        }
        return DateTime.fromISO(value)
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error("DateTimeScalar can only parse string values")
        }
        return DateTime.fromISO(ast.value)
    },
})
