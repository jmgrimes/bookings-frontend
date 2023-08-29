import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { faCubes, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { IUser } from "~/features/models/users"
import UserNavigation from "./UserNavigation"

export interface AppNavigationProps {
    users: IUser[]
}

export default function AppNavigation(props: AppNavigationProps) {
    const users = props.users
    return (
        <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
            <div className="container-md">
                <Link className="navbar-brand" key="/home" href="/">
                    Bookings
                </Link>
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" key="/bookings">
                            <Link className="nav-link" href="/bookings">
                                <FontAwesomeIcon icon={faCalendar} />
                                &nbsp;Bookings
                            </Link>
                        </li>
                        <li className="nav-item" key="/bookables">
                            <Link className="nav-link" href="/bookables">
                                <FontAwesomeIcon icon={faCubes} />
                                &nbsp;Bookables
                            </Link>
                        </li>
                        <li className="nav-item" key="/users">
                            <Link className="nav-link" href="/users">
                                <FontAwesomeIcon icon={faUsers} />
                                &nbsp;Users
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <UserNavigation users={users} />
                </div>
            </div>
        </nav>
    )
}
