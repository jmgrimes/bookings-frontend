import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"

import { Context, dataSources, schema } from "~/features"

const server: ApolloServer<Context> = new ApolloServer<Context>({
    schema,
})

export default startServerAndCreateNextHandler(server, {
    context: async () => {
        const { cache } = server
        return {
            dataSources: dataSources({ cache }),
        }
    },
})
