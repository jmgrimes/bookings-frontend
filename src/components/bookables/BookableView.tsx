"use client"

// TODO Replace client side rendering version of this component with a server side rendered version.

import { BookableCard, BookablesCard } from "~/components/bookables"
import { IBookable } from "~/features/models/bookables"

export interface BookableViewProps {
    bookable: IBookable
    bookables: IBookable[]
}

export default function BookableView(props: BookableViewProps) {
    const { bookable, bookables } = props
    return (
        <div className="container">
            <div className="row">
                <section className="col col-3">
                    <BookablesCard bookable={bookable} bookables={bookables} onSelect={() => {}} />
                </section>
                <section className="col">
                    <BookableCard bookable={bookable} />
                </section>
            </div>
        </div>
    )
}
