import {
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import {
  ApolloServer,
} from "apollo-server-micro";
import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  dataSources,
  schema,
} from "../../server";

const server: ApolloServer = new ApolloServer({
  dataSources,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
  ],
  schema,
});

const apolloServerHandler: Promise<NextApiHandler> = 
  server.start().then(_value => server.createHandler({ path: "/api/graphql" }));

const apiHandler: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  const handle = await apolloServerHandler;
  return handle(request, response);
};

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apiHandler;