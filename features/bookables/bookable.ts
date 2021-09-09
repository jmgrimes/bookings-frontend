import { Booking } from "../bookings";

export enum BookableDay {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday"
}

export enum BookableSession {
  Breakfast = "Breakfast",
  Morning = "Morning",
  Lunch = "Lunch",
  Afternoon = "Afternoon",
  Evening = "Evening"
}

export type Bookable = {
  id: number;
  group: string;
  title: string;
  notes?: string;
  days: BookableDay[];
  sessions: BookableSession[];
  bookings?: Booking[];
};

export const BookableDays: BookableDay[] = [
  BookableDay.Sunday,
  BookableDay.Monday,
  BookableDay.Tuesday,
  BookableDay.Wednesday,
  BookableDay.Thursday,
  BookableDay.Friday,
  BookableDay.Saturday
];

export const BookableSessions: BookableSession[] = [
  BookableSession.Breakfast,
  BookableSession.Morning,
  BookableSession.Lunch,
  BookableSession.Afternoon,
  BookableSession.Evening
];