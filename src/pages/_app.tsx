import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "react-bootstrap"

import { Navigation } from "~/components/application"
import { SessionUserProvider, useSessionUser } from "~/components/users"
import { useUsers } from "~/features/api/users"

import "bootstrap/dist/css/bootstrap.css"

const apolloClient = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
})

function PageNavigation() {
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

export default function App(props: AppProps) {
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
