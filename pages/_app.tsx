import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline } from "@material-ui/core";
import { NextPage } from "next";
import { AppProps } from "next/app";

import { Navigation } from "../components/application";
import { UserProvider } from "../components/users";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <CssBaseline/>
        <Navigation/>
        <Component {...pageProps}/>
      </UserProvider>
    </ApolloProvider>
  );
};

export default MyApp;
