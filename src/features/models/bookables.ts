import { DateTime } from "luxon"

export enum BookableDayEnum {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

export interface BookableDayProps {
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
        return { index, day, date } as BookableDayProps
    },
}

export enum BookableSessionEnum {
    Breakfast = "Breakfast",
    Morning = "Morning",
    Lunch = "Lunch",
    Afternoon = "Afternoon",
    Evening = "Evening",
}

export interface BookableSessionProps {
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
        return { index, session } as BookableSessionProps
    },
}

export interface BookableProps {
    group: string
    title: string
    notes?: string
    days: BookableDayEnum[]
    sessions: BookableSessionEnum[]
}

export interface Bookable extends BookableProps {
    id: number
}
