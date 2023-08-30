import { redirect } from "next/navigation"

import { BookableCard, BookablesCard } from "~/components/bookables"
import BookableApi from "~/features/datasources/bookables"

const bookableApi = new BookableApi()

async function getBookables() {
    return await bookableApi.getBookables()
}

async function getBookable(id: number) {
    return await bookableApi.getBookable(id)
}

export interface BookablePageProps {
    params: {
        id: number
    }
}

export default async function BookablePage(props: BookablePageProps) {
    const bookable = await getBookable(props.params.id)
    const bookables = await getBookables()
    return (
        <div className="container">
            <div className="row">
                <section className="col col-3">
                    <BookablesCard
                        bookable={bookable}
                        bookables={bookables}
                        onSelect={async bookable => {
                            "use server"
                            redirect(`/bookables/${bookable.id}`)
                        }}
                    />
                </section>
                <section className="col">
                    <BookableCard bookable={bookable} />
                </section>
            </div>
        </div>
    )
}
