import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { DateTime } from "luxon"
import { AppProps, AppType } from "next/app"
import { default as Head } from "next/head"
import { FunctionComponent } from "react"
import { Container, Nav, Navbar, ThemeProvider } from "react-bootstrap"
import { Calendar, Collection, People } from "react-bootstrap-icons"

import { UserPicker, UserProvider, useUser, useUsers } from "~components/users"

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

const Navigation: FunctionComponent<Record<string, never>> = () => {
    const [user, setUser] = useUser()
    const { data, loading } = useUsers()
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Bookings</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link href="/bookings">
                            <Calendar /> Bookings
                        </Nav.Link>
                        <Nav.Link href="/bookables">
                            <Collection /> Bookables
                        </Nav.Link>
                        <Nav.Link href="/users">
                            <People /> Users
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    {!loading && data ? <UserPicker users={data?.users} user={user} setUser={setUser} /> : null}
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

type ApplicationProps = AppProps<Record<string, never>>
const Application: AppType<ApplicationProps> = props => {
    const { Component, pageProps } = props
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider>
                <UserProvider>
                    <Head key="viewport">
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <Navigation />
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </UserProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default Application
