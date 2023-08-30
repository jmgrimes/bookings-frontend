import { Metadata } from "next"
import { PropsWithChildren } from "react"

import { AppNavigation } from "~/components/application"
import { UserProvider } from "~/components/users"
import UserApi from "~/features/datasources/users"

import "~/styles/globals.scss"

type AppLayoutProps = PropsWithChildren<Record<never, never>>

async function getUsers() {
    const userApi = new UserApi()
    return await userApi.getUsers()
}

export async function generateMetadata() {
    return {
        title: {
            template: "Bookings Application | %s",
            default: "Bookings Application",
        },
        description: "Welcome to the Bookings Application!",
    } as Metadata
}

export default async function AppLayout(props: AppLayoutProps) {
    const users = await getUsers()
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <AppNavigation users={users} />
                    <main className="my-4">{props.children}</main>
                </UserProvider>
            </body>
        </html>
    )
}
