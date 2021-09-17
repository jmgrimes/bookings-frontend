import {DateTime} from "luxon"
import {useRouter} from "next/router"

type SetBookingsDate = (date: DateTime) => void
type SetBookableId = (bookableId: number) => void

type Week = {
  start: DateTime
  end: DateTime
}

type BookingParams = {
  bookableId?: number
  date: DateTime
  week: Week
  setBookingsDate: SetBookingsDate
  setBookableId: SetBookableId
}

type UseBookingParams = () => BookingParams

export const useBookingsParams: UseBookingParams = () => {
  const router = useRouter()

  const dateParam = router.query.date ? DateTime.fromISO(router.query.date as string) : DateTime.now()
  const date = dateParam.isValid ? dateParam : DateTime.now()
  const week: Week = {
    start: date.startOf("week"),
    end: date.endOf("week")
  }

  const bookableIdParam = router.query.bookableId ? parseInt(router.query.bookableId as string, 10) : undefined
  const bookableId = bookableIdParam ? bookableIdParam : undefined

  const setBookingsDate: SetBookingsDate = (date: DateTime) => {
    router.push({
      pathname: router.pathname,
      query: {
        bookableId: bookableId,
        date: date.toISODate()
      }
    })
  }

  const setBookableId: SetBookableId = (bookableId: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        bookableId: bookableId,
        date: date.toISODate()
      }
    })
  }

  return {
    date,
    week,
    bookableId,
    setBookingsDate,
    setBookableId
  }
}