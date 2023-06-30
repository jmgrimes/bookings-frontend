import Link from "next/link"
import { Calendar, Collection, People } from "react-bootstrap-icons"

export default function Navigation() {
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
                                <Calendar /> Bookings
                            </Link>
                        </li>
                        <li className="nav-item" key="/bookables">
                            <Link className="nav-link" href="/bookables">
                                <Collection /> Bookables
                            </Link>
                        </li>
                        <li className="nav-item" key="/users">
                            <Link className="nav-link" href="/users">
                                <People /> Users
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
