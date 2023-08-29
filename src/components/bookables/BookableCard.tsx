import BookableDaysList from "~/components/bookables/BookableDaysList"
import BookableSessionsList from "~/components/bookables/BookableSessionsList"
import { Button } from "~/components/controls"
import { IBookableView } from "~/features/models/bookables"
import { Consumer } from "~/features/support"

interface IBookableCardProps {
    bookable: IBookableView
    onEdit?: Consumer<IBookableView>
    onView?: Consumer<IBookableView>
    onDelete?: Consumer<IBookableView>
}

export default function BookableCard(props: IBookableCardProps) {
    const { bookable, onView, onEdit, onDelete } = props
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title h5">{bookable.title}</h5>
                <h6 className="card-subtitle h6">{bookable.group}</h6>
            </div>
            <div className="card-body">
                <h6 className="card-subtitle h6">Notes</h6>
                <p className="card-text">{bookable.notes}</p>
                <h6 className="card-subtitle h6">Availability</h6>
                <div className="row">
                    <div className="col">
                        <BookableDaysList days={bookable.days} />
                    </div>
                    <div className="col">
                        <BookableSessionsList sessions={bookable.sessions} />
                    </div>
                </div>
            </div>
            <div className="card-footer text-center">
                <div role="group" className="btn-group">
                    {onView && <Button variant="view" onClick={() => onView(bookable)} />}
                    {onEdit && <Button variant="edit" onClick={() => onEdit(bookable)} />}
                    {onDelete && <Button variant="delete" onClick={() => onDelete(bookable)} />}
                </div>
            </div>
        </div>
    )
}
