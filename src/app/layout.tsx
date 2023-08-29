import { PropsWithChildren } from "react"

import { Navigation } from "~/components/application"
import { UserProvider } from "~/components/users"

import "bootstrap/dist/css/bootstrap.css"

type IAppLayoutProps = PropsWithChildren<Record<never, never>>

export default async function AppLayout(props: IAppLayoutProps) {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <Navigation />
                    {props.children}
                </UserProvider>
            </body>
        </html>
    )
}
