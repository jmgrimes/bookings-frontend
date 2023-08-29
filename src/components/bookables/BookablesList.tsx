import { faCube } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface IBookablesListProps {
    bookable?: IBookableView
    bookables: IBookableView[]
    onSelect?: Consumer<IBookableView>
}

export default function BookablesList(props: IBookablesListProps) {
    const { bookable, bookables, onSelect } = props
    return (
        <ul className="list-group">
            {bookables.map(b => (
                <li
                    className={`list-group-item${b.id === bookable?.id ? " active" : ""}`}
                    key={b.id}
                    onClick={() => (onSelect ? onSelect(b) : {})}>
                    <FontAwesomeIcon icon={faCube} /> {b.title}
                </li>
            ))}
        </ul>
    )
}
