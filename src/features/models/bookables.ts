export enum BookableDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export enum BookableSession {
    Breakfast = 0,
    Morning = 1,
    Lunch = 2,
    Afternoon = 3,
    Dinner = 4,
}

export interface IBookableProps {
    group: string
    title: string
    notes?: string
    days: BookableDay[]
    sessions: BookableSession[]
}

export interface IBookable extends IBookableProps {
    id: number
}
