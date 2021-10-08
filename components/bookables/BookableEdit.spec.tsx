/**
 * @jest-environment jsdom
 */
import {
  MockedProvider,
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
  UseBookableQuery,
} from "../../features/bookables/useBookable"

import BookableEdit from "./BookableEdit"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

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

const errorMessage = "could not load bookable"

const flushAllPromises = () => new Promise<void>(resolve => setTimeout(resolve, 0))

const successMocks = [
  {
    request: {
      query: UseBookableQuery,
      variables: {
        id: bookable.id,
      },
    },
    result: {
      data: {
        bookable,
      },
    },
  }
]

const errorMocks = [
  {
    request: {
      query: UseBookableQuery,
      variables: {
        id: bookable.id,
      },
    },
    error: new Error(errorMessage),
  },
]

type BookableEditTestProps = {
  error?: boolean
}

const BookableEditTest: FunctionComponent<BookableEditTestProps> = (props) => {
  const {error} = props
  const mocks = error ? errorMocks : successMocks
  return (
    <MockedProvider mocks={mocks}>
      <BookableEdit/>
    </MockedProvider>
  )
}

describe("<BookableEdit/>", () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {
        id: bookable.id,
      },
    })
  })

  it("should render the completed state properly", async () => {
    const {getByRole, getByText} = render(<BookableEditTest/>)
    await act(() => flushAllPromises())

    const title = getByText(/Edit Bookable/)
    expect(title).toBeInTheDocument()

    const groupField = getByRole("textbox", {name: /group/i})
    expect(groupField).toHaveAttribute("value", bookable.group)

    const titleField = getByRole("textbox", {name: /title/i})
    expect(titleField).toHaveAttribute("value", bookable.title)

    const notesField = getByRole("textbox", {name: /notes/i})
    expect(notesField).toHaveTextContent(bookable.notes as string)

    const daysField = getByRole("button", {name: /days/i})
    expect(daysField).toHaveTextContent(bookable.days.join(", "))

    const sessionsField = getByRole("button", {name: /sessions/i})
    expect(sessionsField).toHaveTextContent(bookable.sessions.join(", "))

    const saveButton = getByRole("button", {name: /save/i})
    expect(saveButton).toBeInTheDocument()

    const deleteButton = getByRole("button", {name: /delete/i})
    expect(deleteButton).toBeInTheDocument()

    const cancelButton = getByRole("button", {name: /cancel/i})
    expect(cancelButton).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const {getByText} = render(<BookableEditTest error/>)
    await act(() => flushAllPromises())

    const error = getByText(errorMessage)
    expect(error).toBeInTheDocument()
  })
})