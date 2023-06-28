import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { NextApiRequest, NextApiResponse } from "next"

import { Context, GetDataSources, GetSchema } from "~/features/graphql"

let handler: {
    (req: NextApiRequest, res: NextApiResponse): Promise<unknown>
    (req: Request, res?: undefined): Promise<Response>
}

async function GetHandler() {
    if (!handler) {
        const schema = await GetSchema()
        const server = new ApolloServer<Context>({ schema })
        handler = startServerAndCreateNextHandler(server, {
            context: async () => {
                const { cache } = server
                return {
                    dataSources: await GetDataSources({ cache }),
                }
            },
        })
    }
    return handler
}

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
    await GetHandler().then(handler => handler(request, response))
}
