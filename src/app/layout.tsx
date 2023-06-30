import Head from "next/head"
import { PropsWithChildren } from "react"

import { Navigation } from "~/components/application"
import { UserProvider } from "~/components/users"

import "bootstrap/dist/css/bootstrap.css"

type IAppLayoutProps = PropsWithChildren<Record<never, never>>

export default async function AppLayout(props: IAppLayoutProps) {
    return (
        <html lang="en">
            <Head key="viewport">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <body>
                <UserProvider>
                    <Navigation />
                    {props.children}
                </UserProvider>
            </body>
        </html>
    )
}
