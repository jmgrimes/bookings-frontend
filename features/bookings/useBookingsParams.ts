import {
  DateTime,
} from "luxon"
import {
  useRouter,
} from "next/router"

type Week = {
  start: DateTime
  end: DateTime
}

type BookingParams = {
  bookableId?: number
  date: DateTime
  week: Week
  setBookingsDate: (date: DateTime) => void
  setBookableId: (bookableId: number) => void
}

type UseBookingParams = () => BookingParams

const useBookingsParams: UseBookingParams = () => {
  const router = useRouter()

  const dateParam = router.query.date ? DateTime.fromISO(router.query.date as string) : DateTime.now()
  const date = dateParam.isValid ? dateParam : DateTime.now()
  const week: Week = {
    start: date.startOf("week"),
    end: date.endOf("week"),
  }

  const bookableIdParam = router.query.bookableId ? parseInt(router.query.bookableId as string, 10) : undefined
  const bookableId = bookableIdParam ? bookableIdParam : undefined

  const setBookingsDate = (date: DateTime) => {
    router.push({
      pathname: router.pathname,
      query: {
        bookableId: bookableId,
        date: date.toISODate(),
      },
    })
  }

  const setBookableId = (bookableId: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        bookableId: bookableId,
        date: date.toISODate(),
      },
    })
  }

  return {
    date,
    week,
    bookableId,
    setBookingsDate,
    setBookableId,
  }
}

export default useBookingsParams