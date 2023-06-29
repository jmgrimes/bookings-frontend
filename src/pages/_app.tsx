import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "react-bootstrap"

import { Navigation } from "~/components/application"
import { UserConsumer, UserProvider } from "~/components/users"
import { useUsers } from "~/features/api/users"

import "bootstrap/dist/css/bootstrap.css"

const apolloClient = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
})

function PageNavigation() {
    const { data, error, loading } = useUsers()
    if (loading) {
        return <Navigation.Loading />
    }
    if (error || !data) {
        return <Navigation.Failed />
    }
    return (
        <UserConsumer>
            {userContext => {
                const { user, setUser } = userContext
                return <Navigation users={data.users} user={user} setUser={setUser} />
            }}
        </UserConsumer>
    )
}

export default function App(props: AppProps) {
    const { Component: Page, pageProps } = props
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider>
                <UserProvider>
                    <Head key="viewport">
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <PageNavigation />
                    <Page {...pageProps} />
                </UserProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}
