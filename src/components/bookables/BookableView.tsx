import BookableDaysList from "~/components/bookables/BookableDaysList"
import BookableSessionsList from "~/components/bookables/BookableSessionsList"
import { Button } from "~/components/controls"
import { Bookable } from "~/features/models/bookables"

export interface BookableViewProps {
    bookable: Bookable
    onEdit?: () => void | Promise<void>
    onDelete?: () => void | Promise<void>
}

export default function BookableView(props: BookableViewProps) {
    const { bookable, onEdit, onDelete } = props
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title h5">{bookable.title}</h5>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle h6 mb-2">Notes</h6>
                <p className="card-text">{bookable.notes}</p>
                <h6 className="card-subtitle h6 mb-2">Availability</h6>
                <div className="row">
                    <div className="col">
                        <BookableDaysList days={bookable.days} />
                    </div>
                    <div className="col">
                        <BookableSessionsList sessions={bookable.sessions} />
                    </div>
                </div>
            </div>
            {onEdit && onDelete && (
                <div className="card-footer">
                    <div className="text-center">
                        <div role="group" className="btn-group">
                            {onEdit && <Button variant="edit" onClick={() => onEdit()} />}
                            {onDelete && <Button variant="delete" onClick={() => onDelete()} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
