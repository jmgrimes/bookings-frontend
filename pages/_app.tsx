import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client"
import {
  CssBaseline
} from "@material-ui/core"
import {
  DateTime
} from "luxon"
import {
  NextPage
} from "next"
import {
  AppProps
} from "next/app"

import {
  Navigation
} from "../components/application"
import {
  UserProvider
} from "../components/users"

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Booking: {
        fields: {
          date: {
            read: (date: string) => DateTime.fromISO(date)
          }
        }
      }
    }
  })
})

const MyApp: NextPage<AppProps> = (props: AppProps) => {
  const {Component, pageProps} = props;
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <CssBaseline/>
        <Navigation/>
        <Component {...pageProps}/>
      </UserProvider>
    </ApolloProvider>
  )
}

export default MyApp
