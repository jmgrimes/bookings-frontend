import {
  Booking
} from "../bookings";

export type Bookable = {
  id: number;
  group: string;
  title: string;
  notes?: string;
  days: string[];
  sessions: string[];
  bookings?: Booking[];
};