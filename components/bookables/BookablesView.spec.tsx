/**
 * @jest-environment jsdom
 */
import {
  MockedProvider
} from "@apollo/client/testing"
import {
  act,
  render,
} from "@testing-library/react"
import {
  FunctionComponent,
} from "react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"
import {
  UseBookablesQuery,
} from "../../features/bookables/useBookables"

import BookablesView from "./BookablesView"

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

const errorMessage = "could not load users"

const flushAllPromises = () => new Promise<void>(resolve => setTimeout(resolve, 0))

const successMocks = [
  {
    request: {
      query: UseBookablesQuery,
    },
    result: {
      data: {
        bookables,
      },
    },
  }
]

const errorMocks = [
  {
    request: {
      query: UseBookablesQuery,
    },
    error: new Error(errorMessage),
  },
]

type BookablesViewTestProps = {
  error?: boolean
}

const BookablesViewTest: FunctionComponent<BookablesViewTestProps> = (props) => {
  const {error} = props
  const mocks = error ? errorMocks : successMocks
  return (
    <MockedProvider mocks={mocks}>
      <BookablesView/>
    </MockedProvider>
  )
}

describe("<BookablesView/>", () => {
  it("should render the completed state properly with no path bookable", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/bookables",
      query: {},
    })
    const {getByText, getAllByText} = render(<BookablesViewTest/>)
    await act(() => flushAllPromises())
    expect(getByText(room2.title)).toBeInTheDocument()
    expect(getAllByText(room1.title)).toHaveLength(2)
    expect(getByText(room1.notes as string)).toBeInTheDocument()
  })

  it("should render the completed state properly with a path bookable", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/bookables/[id]",
      query: {
        id: "3",
      },
    })
    const {getByText, getAllByText} = render(<BookablesViewTest/>)
    await act(() => flushAllPromises())
    expect(getAllByText(room2.title)).toHaveLength(2)
    expect(getByText(room1.title)).toBeInTheDocument()
    expect(getByText(room2.notes as string)).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const {getByText} = render(<BookablesViewTest error/>)
    await act(() => flushAllPromises())
    expect(getByText("An error occurred while loading bookables.")).toBeInTheDocument()
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})