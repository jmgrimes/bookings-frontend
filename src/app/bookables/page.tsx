import { notFound, redirect } from "next/navigation"
import BookableApi from "~/features/datasources/bookables"

const bookableApi = new BookableApi()

async function getBookable() {
    const bookables = await bookableApi.getBookables()
    return bookables ? bookables[0] : undefined
}

export default async function BookablesPage() {
    const bookable = await getBookable()
    if (bookable) {
        redirect(`/bookables/${bookable.id}`)
    } else {
        notFound()
    }
}
