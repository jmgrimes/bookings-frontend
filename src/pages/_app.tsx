import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { DateTime } from "luxon"
import { AppProps, AppType } from "next/app"
import Head from "next/head"
import { FunctionComponent } from "react"
import { ThemeProvider } from "react-bootstrap"

import { Navigation } from "~components/application"
import { SessionUserProvider, useSessionUser, useUsers } from "~components/users"

import "bootstrap/dist/css/bootstrap.css"

const apolloClient = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache({
        typePolicies: {
            Booking: {
                fields: {
                    date: {
                        read: (value: string) => DateTime.fromISO(value),
                    },
                },
            },
        },
    }),
})

const PageNavigation: FunctionComponent = () => {
    const [sessionUser, setSessionUser] = useSessionUser()
    const { data, error, loading } = useUsers()
    if (loading) {
        return <Navigation.Loading />
    }
    if (error || !data) {
        return <Navigation.Failed />
    }
    return <Navigation users={data.users} user={sessionUser} setUser={setSessionUser} />
}

type ApplicationProps = AppProps
const Application: AppType<ApplicationProps> = props => {
    const { Component: Page, pageProps } = props
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider>
                <SessionUserProvider>
                    <Head key="viewport">
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <PageNavigation />
                    <Page {...pageProps} />
                </SessionUserProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default Application
