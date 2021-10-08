/**
 * @jest-environment jsdom
 */
import {
  act,
  fireEvent, getByText,
  render,
  within,
} from "@testing-library/react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"

import BookablesList from "./BookablesList"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const room1: Bookable = {
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

const room2: Bookable = {
  id: 3,
  group: "Rooms",
  title: "Test Room 2",
  notes: "Test Room 2 Notes",
  days: [
    BookableDayEnum.Monday,
    BookableDayEnum.Wednesday,
    BookableDayEnum.Friday,
  ],
  sessions: [
    BookableSessionEnum.Breakfast,
    BookableSessionEnum.Lunch,
  ],
}

const kit: Bookable = {
  id: 2,
  group: "Kit",
  title: "Test Kit",
  notes: "Test Kit Notes",
  days: [
    BookableDayEnum.Monday,
    BookableDayEnum.Wednesday,
    BookableDayEnum.Friday,
  ],
  sessions: [
    BookableSessionEnum.Breakfast,
    BookableSessionEnum.Lunch,
  ],
}

const bookables = [
  room1,
  kit,
  room2,
]
const getUrl = (id: number) => `/bookable/${id}`

describe("<BookablesList/>", () => {
  it("should display the list of rooms when a room is chosen", () => {
    const {getAllByRole, getByText, queryByText} = render(
      <BookablesList bookables={bookables} bookable={room1} getUrl={getUrl}/>
    )
    expect(getAllByRole("link")).toHaveLength(2)
    expect(getByText(room1.title)).toBeInTheDocument()
    expect(getByText(room1.group)).toBeInTheDocument()
    expect(getByText(room2.title)).toBeInTheDocument()
    expect(getByText(room2.group)).toBeInTheDocument()
    expect(queryByText(kit.group)).not.toBeInTheDocument()
    expect(queryByText(kit.title)).not.toBeInTheDocument()
  })

  it("should display the list of kit when a kit is chosen", () => {
    const {getAllByRole, getByText, queryByText} = render(
      <BookablesList bookables={bookables} bookable={kit} getUrl={getUrl}/>
    )
    expect(getAllByRole("link")).toHaveLength(1)
    expect(getByText(kit.title)).toBeInTheDocument()
    expect(getByText(kit.group)).toBeInTheDocument()
    expect(queryByText(room1.group)).not.toBeInTheDocument()
    expect(queryByText(room1.title)).not.toBeInTheDocument()
    expect(queryByText(room2.group)).not.toBeInTheDocument()
    expect(queryByText(room2.title)).not.toBeInTheDocument()
  })

  it("should swap to the first item of a new group when the group is changed", () => {
    const push = jest.fn()
    useRouter.mockReturnValueOnce({ push })
    const {getByRole, getByText} = render(
      <BookablesList bookables={bookables} bookable={room1} getUrl={getUrl}/>
    )
    act(() => {
      fireEvent.mouseDown(getByText(room1.group))
    })
    act(() => {
      within(getByRole("listbox")).getByText(kit.group).click()
    })
    expect(push).toBeCalledWith(getUrl(kit.id))
  })

  it("should swap to the previous item when previous is clicked", () => {
    const push = jest.fn()
    useRouter.mockReturnValueOnce({ push })
    const {getByRole} = render(<BookablesList bookables={bookables} bookable={room2} getUrl={getUrl}/>)
    const previousButton = getByRole("button", {name: /prev/i})
    act(() => {
      previousButton.click()
    })
    expect(push).toBeCalledWith(getUrl(room1.id))
  })

  it("should swap to the next item when next is clicked", () => {
    const push = jest.fn()
    useRouter.mockReturnValueOnce({ push })
    const {getByRole} = render(<BookablesList bookables={bookables} bookable={room1} getUrl={getUrl}/>)
    const nextButton = getByRole("button", {name: /next/i})
    act(() => {
      nextButton.click()
    })
    expect(push).toBeCalledWith(getUrl(room2.id))
  })
})