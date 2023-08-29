import { BookableView } from "~/components/bookables"
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
    return <BookableView bookable={bookable} bookables={bookables} />
}
