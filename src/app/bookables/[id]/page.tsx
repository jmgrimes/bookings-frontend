import { redirect } from "next/navigation"

import { BookableCard, BookablesCard } from "~/components/bookables"
import BookableApi from "~/features/datasources/bookables"
import { BookableProps } from "~/features/models/bookables"

const bookableApi = new BookableApi()

export const dynamic = "force-dynamic"

async function getBookables() {
    return await bookableApi.getBookables()
}

async function getBookable(id: number) {
    return await bookableApi.getBookable(id)
}

async function updateBookable(id: number, props: BookableProps) {
    return await bookableApi.updateBookable(id, props)
}

async function deleteBookable(id: number) {
    return await bookableApi.deleteBookable(id)
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
                    <BookableCard
                        bookable={bookable}
                        onSave={async (bookableProps: BookableProps) => {
                            "use server"
                            return await updateBookable(props.params.id, bookableProps)
                        }}
                        onDelete={async () => {
                            "use server"
                            await deleteBookable(props.params.id)
                            redirect("/bookables")
                        }}
                    />
                </section>
            </div>
        </div>
    )
}
