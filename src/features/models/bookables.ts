import { DateTime } from "luxon"

import type { IBookingView } from "~/features/models/bookings"

export enum BookableDayEnum {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

export interface IBookableDayProps {
    index: number
    day: BookableDayEnum
    date: DateTime
}

export const BookableDay = {
    values: [
        BookableDayEnum.Sunday,
        BookableDayEnum.Monday,
        BookableDayEnum.Tuesday,
        BookableDayEnum.Wednesday,
        BookableDayEnum.Thursday,
        BookableDayEnum.Friday,
        BookableDayEnum.Saturday,
    ],
    toBookableDayProps: (weekStart: DateTime, day: BookableDayEnum) => {
        const index = BookableDay.values.indexOf(day)
        const date = weekStart.plus({ days: index })
        return { index, day, date } as IBookableDayProps
    },
}

export enum BookableSessionEnum {
    Breakfast = "Breakfast",
    Morning = "Morning",
    Lunch = "Lunch",
    Afternoon = "Afternoon",
    Evening = "Evening",
}

export interface IBookableSessionProps {
    index: number
    session: BookableSessionEnum
}

export const BookableSession = {
    values: [
        BookableSessionEnum.Breakfast,
        BookableSessionEnum.Morning,
        BookableSessionEnum.Lunch,
        BookableSessionEnum.Afternoon,
        BookableSessionEnum.Evening,
    ],
    toBookableSessionProps: (session: BookableSessionEnum) => {
        const index = BookableSession.values.indexOf(session)
        return { index, session } as IBookableSessionProps
    },
}

export interface IBookableProps {
    group: string
    title: string
    notes?: string
    days: BookableDayEnum[]
    sessions: BookableSessionEnum[]
}

export interface IBookable extends IBookableProps {
    id: number
}

export interface IBookableView extends IBookable {
    bookings?: IBookingView[]
}
