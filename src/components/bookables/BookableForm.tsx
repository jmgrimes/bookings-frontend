import { useForm } from "react-hook-form"

import { Button } from "~/components/controls"
import { Bookable, BookableDay, BookableProps, BookableSession } from "~/features/models/bookables"
import { Consumer, Provider } from "~/features/support"

export interface BookableFormProps {
    bookable?: Bookable
    onSave: Consumer<BookableProps>
    onCancel: Provider<void>
}

export default function BookableForm(props: BookableFormProps) {
    const { bookable, onSave, onCancel } = props

    const { formState, handleSubmit, register } = useForm<BookableProps>({ defaultValues: bookable })

    const onSubmit = handleSubmit(onSave)

    return (
        <form>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title h5">{bookable ? "Edit Bookable" : "New Bookable"}</h5>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle h6 mb-3">
                        <p className="form-label mb-2">Title</p>
                        <input
                            id="title"
                            className={`form-control mb-2 w-50${formState.errors.title ? " is-invalid" : ""}`}
                            {...register("title", { required: true, maxLength: 50 })}
                        />
                        {formState.errors.title?.type === "required" && (
                            <p className="invalid-feedback mb-2">Title is required.</p>
                        )}
                        {formState.errors.title?.type === "maxLength" && (
                            <p className="invalid-feedback mb-2">Title must be 50 characters or less.</p>
                        )}
                    </h6>
                    <h6 className="card-subtitle h6 mb-3">
                        <p className="form-label mb-2">Group</p>
                        <input
                            id="group"
                            className={`form-control mb-2 w-50${formState.errors.group ? " is-invalid" : ""}`}
                            {...register("group", { required: true, maxLength: 50 })}
                        />
                        {formState.errors.group?.type === "required" && (
                            <p className="invalid-feedback mb-2">Group is required.</p>
                        )}
                        {formState.errors.group?.type === "maxLength" && (
                            <p className="invalid-feedback mb-2">Group must be 50 characters or less.</p>
                        )}
                    </h6>
                    <h6 className="card-subtitle h6 mb-3">
                        <p className="form-label mb-2">Title</p>
                        <textarea
                            id="notes"
                            className={`form-control mb-2 w-100${formState.errors.notes ? " is-invalid" : ""}`}
                            {...register("notes", { maxLength: 2000 })}
                        />
                        {formState.errors.notes?.type === "maxLength" && (
                            <p className="invalid-feedback mb-2">Notes must be 2000 characters or less.</p>
                        )}
                    </h6>
                    <h6 className="card-subtitle h6 mb-3">
                        <p className="form-label mb-2">Availability</p>
                        <div className="row">
                            <div className="col">
                                <select
                                    id="days"
                                    className="form-select"
                                    size={BookableDay.values.length}
                                    multiple
                                    {...register("days")}>
                                    {BookableDay.values.map(day => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    id="sessions"
                                    className="form-select"
                                    size={BookableSession.values.length}
                                    multiple
                                    {...register("sessions")}>
                                    {BookableSession.values.map(session => (
                                        <option key={session} value={session}>
                                            {session}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </h6>
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <div role="group" className="btn-group">
                            <Button variant="save" onClick={onSubmit} />
                            <Button variant="cancel" onClick={onCancel} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
