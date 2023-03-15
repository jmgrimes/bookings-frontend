import { DateTime } from "luxon"

import { Booking } from "../bookings"

export enum BookableDayEnum {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

export interface BookableDayModel {
    index: number
    day: BookableDayEnum
    date: DateTime
}

interface BookableDayType {
    values: BookableDayEnum[]
    toModel: (weekStart: DateTime, day: BookableDayEnum) => BookableDayModel
}

export const BookableDay: BookableDayType = {
    values: [
        BookableDayEnum.Sunday,
        BookableDayEnum.Monday,
        BookableDayEnum.Tuesday,
        BookableDayEnum.Wednesday,
        BookableDayEnum.Thursday,
        BookableDayEnum.Friday,
        BookableDayEnum.Saturday,
    ],
    toModel: (weekStart: DateTime, day: BookableDayEnum) => {
        const index = BookableDay.values.indexOf(day)
        const date = weekStart.plus({ days: index })
        const model: BookableDayModel = { index, day, date }
        return model
    },
}

export enum BookableSessionEnum {
    Breakfast = "Breakfast",
    Morning = "Morning",
    Lunch = "Lunch",
    Afternoon = "Afternoon",
    Evening = "Evening",
}

export interface BookableSessionModel {
    index: number
    session: BookableSessionEnum
}

interface BookableSessionType {
    values: BookableSessionEnum[]
    toModel: (session: BookableSessionEnum) => BookableSessionModel
}

export const BookableSession: BookableSessionType = {
    values: [
        BookableSessionEnum.Breakfast,
        BookableSessionEnum.Morning,
        BookableSessionEnum.Lunch,
        BookableSessionEnum.Afternoon,
        BookableSessionEnum.Evening,
    ],
    toModel: (session: BookableSessionEnum) => {
        const index = BookableSession.values.indexOf(session)
        const model: BookableSessionModel = {
            index,
            session,
        }
        return model
    },
}

export interface Bookable {
    id: number
    group: string
    title: string
    notes?: string
    days: BookableDayEnum[]
    sessions: BookableSessionEnum[]
    bookings?: Booking[]
}
