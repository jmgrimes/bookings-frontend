import {
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core"
import {
  ApolloServer,
} from "apollo-server-micro"
import {
  NextApiHandler,
} from "next"

import {
  dataSources,
  schema,
} from "../../features"

const server: ApolloServer = new ApolloServer({
  dataSources,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
  ],
  schema,
})

const apolloServerHandler: Promise<NextApiHandler> =
  server.start().then(_value => server.createHandler({path: "/api/graphql" }));

const apiHandler: NextApiHandler = async (request, response) => {
  const handle = await apolloServerHandler
  return handle(request, response)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apiHandler