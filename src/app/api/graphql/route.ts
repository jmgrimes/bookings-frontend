import { createYoga, YogaInitialContext } from "graphql-yoga"
import { Context, GetDataSources, GetSchema } from "~/features/definitions"

let handleRequest: (request: Request, context: YogaInitialContext & Context) => Promise<Response>

async function CreateHandler() {
    if (!handleRequest) {
        const yogaServer = createYoga<Context>({
            context: () => ({
                dataSources: GetDataSources(),
            }),
            fetchAPI: { Response },
            graphqlEndpoint: "/api/graphql",
            schema: await GetSchema(),
        })
        handleRequest = yogaServer.handleRequest
    }
    return handleRequest
}

async function handler(request: Request, context: YogaInitialContext & Context) {
    return CreateHandler().then(handler => handler(request, context))
}

export { handler as GET, handler as POST }
