/**
 * @jest-environment jsdom
 */
import {
  act,
  render,
} from "@testing-library/react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"

import BookableDetails from "./BookableDetails"

const bookable: Bookable = {
  id: 1,
  group: "Rooms",
  title: "Test Room",
  notes: "Test Room Notes",
  days: [
    BookableDayEnum.Sunday,
    BookableDayEnum.Saturday,
  ],
  sessions: [
    BookableSessionEnum.Morning,
    BookableSessionEnum.Evening,
  ],
}

describe("<BookableDetails/>", () => {
  it("should show the bookable information including availability initially", () => {
    const {getByText} = render(<BookableDetails bookable={bookable}/>)
    expect(getByText(bookable.group)).toBeInTheDocument()
    expect(getByText(bookable.title)).toBeInTheDocument()
    expect(getByText(bookable.notes as string)).toBeInTheDocument()
    expect(getByText("Availability")).toBeInTheDocument()
    bookable.days.forEach(day => expect(getByText(day)).toBeInTheDocument())
    bookable.sessions.forEach(session => expect(getByText(session)).toBeInTheDocument())
  })

  it("should hide availability when toggled off", () => {
    const {getByRole, getByText, queryByText} = render(<BookableDetails bookable={bookable}/>)
    const button = getByRole("button")
    act(() => button.click())
    expect(getByText(bookable.group)).toBeInTheDocument()
    expect(getByText(bookable.title)).toBeInTheDocument()
    expect(getByText(bookable.notes as string)).toBeInTheDocument()
    expect(queryByText("Availability")).not.toBeInTheDocument()
    bookable.days.forEach(day => expect(queryByText(day)).not.toBeInTheDocument())
    bookable.sessions.forEach(session => expect(queryByText(session)).not.toBeInTheDocument())
  })

  it("should show availability when toggled off and back on", () => {
    const {getByRole, getByText} = render(<BookableDetails bookable={bookable}/>)
    const button = getByRole("button")
    act(() => {
      button.click()
      button.click()
    })
    expect(getByText(bookable.group)).toBeInTheDocument()
    expect(getByText(bookable.title)).toBeInTheDocument()
    expect(getByText(bookable.notes as string)).toBeInTheDocument()
    expect(getByText("Availability")).toBeInTheDocument()
    bookable.days.forEach(day => expect(getByText(day)).toBeInTheDocument())
    bookable.sessions.forEach(session => expect(getByText(session)).toBeInTheDocument())
  })
})